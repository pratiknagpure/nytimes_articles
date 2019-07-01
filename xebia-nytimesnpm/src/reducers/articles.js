import * as actionTypes from '../actions/actionTypes';

const initialState = {
    articles: [],
    selectedArticle: null,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_LOADER:
            return {
                ...state,
                loading: true
            };
        case actionTypes.SET_ARTICLES:
            return {
                ...state,
                articles: [...action.articles],
                loading: false
            };

        case actionTypes.SELECT_ARTICLE:
            return {
                ...state,
                selectedArticle: {...action.article},
                loading: false
            };

        case actionTypes.DESELECT_ARTICLE:
            return {
                ...state,
                selectedArticle: null
            };

        case actionTypes.SET_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false
            };

        default:
            return state;
    }
};

export default reducer;