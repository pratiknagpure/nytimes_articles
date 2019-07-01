function getArticleState(state) {
  return state.article;
}

export function getArticlesSelector(state) {
  return getArticleState(state).articles;
}

export function getSelectedArticleSelector(state) {
  return getArticleState(state).selectedArticle;
}

export function getArticlesLoadingSelector(state) {
  return getArticleState(state).loading;
}

export function getArticlesErrorSelector(state) {
  return getArticleState(state).error;
}
