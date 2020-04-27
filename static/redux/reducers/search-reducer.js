import * as actionTypes from '../actions/actionsTypes'

let initialState = {
    hobbiesToSearch: [],
    hobbiesShow: [],
    category: 'Все категории',
    initializedSearchPage: false,
    word: '',
    isInSearchPage: false,
};

const searchPageReducer = (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.SET_HOBBIES_TO_SEARCH:
        return {
            ...state, hobbiesToSearch: action.hobbiesToSearch,
        };
    case actionTypes.SET_CATEGORY:
        return {
            ...state, category: action.category,
        };
    case actionTypes.SET_IN_SEARCH_PAGE:
        return {
            ...state, isInSearchPage: action.isInSearchPage,
        };
    case actionTypes.SET_SEARCH_WORD:
        return{
            ...state, word: action.searchWord,
        };
    case actionTypes.INITIALIZED_SEARCH_SUCCESS:
        return {
            ...state, initializedSearchPage: action.initialize
        };

    case actionTypes.SET_HOBBY_SHOW:
        return {
            ...state, hobbiesShow: action.hobbiesShow
        };
    default:
        return state;
    }
};
export default searchPageReducer;
