import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if(!module.hot) {
  module.hot.accept();
}


const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);

    if(!id) return;
    //preloader
    recipeView.renderSpinner();

    //loading recipe
    await model.loadRecipe(id);

    // rendering recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function() {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if(!query) return;

    await model.loadSearchResult(query);

    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);

  } catch(err) {
    console.log(err);
  }
};

const controlPagination = function(goToPage) {
  //render new result
  resultsView.render(model.getSearchResultsPage(goToPage));

  //render new page button
  paginationView.render(model.state.search);
}

const controlServings = function(newServings) {
  model.updateServings(newServings);

  recipeView.render(model.state.recipe);
}

const init = function() {
  recipeView.addHandelerRender(controlRecipes);
  recipeView.addHandelerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
}
init();
// controlRecipes();
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);