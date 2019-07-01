import * as actionTypes from "./actionTypes";
import * as constants from "../AppConstants";
import axios from "axios";

export const setArticles = articles => {
  return {
    type: actionTypes.SET_ARTICLES,
    articles: articles
  };
};

export const getArticles = () => {
  return dispatch => {
    dispatch(startLoader());

    axios
      .get(constants.API_URL)
      .then(response => {
        dispatch(setArticles(response.data.results));
      })
      .catch(error => {
        dispatch(setError(error));
      });
  };
};

export const getArticle = id => {
  return dispatch => {
    dispatch(startLoader());

    axios
      .get(constants.API_URL)
      .then(response => {
        const article = response.data.results.find(
          article => article.id === +id
        );
        dispatch(selectArticle(article));
      })
      .catch(error => {
        dispatch(setError(error));
      });
  };
};

export const selectArticle = article => {
  return {
    type: actionTypes.SELECT_ARTICLE,
    article: article
  };
};

export const deselectArticle = () => {
  return {
    type: actionTypes.DESELECT_ARTICLE
  };
};

export const setError = error => {
  return {
    type: actionTypes.SET_ERROR,
    error: error
  };
};

export const startLoader = () => {
  return {
    type: actionTypes.START_LOADER
  };
};
