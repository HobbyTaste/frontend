import Hobby from "../../api/Hobby";
import {setIsUserInCabinet} from "./auth-reducer";


const SET_HOBBY_CARDS = 'SET-HOBBY-CARDS';
const INITIALIZE_HOBBIES = 'INITIALIZE_HOBBIES';
const TOGGLE_IS_ADDING_PROGRESS = 'TOGGLE_IS_ADDING_PROGRESS';
const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING';

const hobbyApi = new Hobby();

let initialState = {
    hobbyCards: [],
    initializedHobbiesPage: false,
    addingInProgress: [],
    isLoading: false
};

const hobbiesPageReducer = (state = initialState, action) => {
    switch (action.type) {
    case INITIALIZE_HOBBIES:
        return {
            ...state, initializedHobbiesPage: action.initialize
        };
    case SET_HOBBY_CARDS:
        return {...state, hobbyCards: action.hobbyCards};
    case TOGGLE_IS_LOADING: {
        return {...state, isLoading: action.isLoading}
    }
    case TOGGLE_IS_ADDING_PROGRESS:
        return {
            ...state,
            addingInProgress: action.isLoading ?
                [...state.addingInProgress, action.hobbyId]
                : state.addingInProgress.filter(id => id !== action.hobbyId)
        };
    default:
        return state;
    }
};

const setHobbyCards = (hobbyCards) => ({type: SET_HOBBY_CARDS, hobbyCards});
const initializedHobbiesPageSuccess = (initialize) => ({type: INITIALIZE_HOBBIES, initialize});
export const toggleAddingProgress = (isLoading, hobbyId) => ({type: TOGGLE_IS_ADDING_PROGRESS,
    isLoading, hobbyId});
export default hobbiesPageReducer;

export const findHobbies = (label, metroId) => (dispatch) => {
    return hobbyApi.find(label, metroId)
        .then((response) => {
            if (response.ok) {
                response.json().then(body => {
                    dispatch(setHobbyCards(body));
                });
            } else {
                response.json().then(console.log);
            }
        })
};

export const initializeHobbiesPage = (type, metro) => (dispatch) => {
    dispatch(initializedHobbiesPageSuccess(false));
    dispatch(setIsUserInCabinet(false));
    let promise;
    if(metro) {
        promise = dispatch(findHobbies(type, metro));
    }
    else {
        promise = dispatch(findHobbies(type));
    }
    Promise.all([promise])
        .then(() => {
            dispatch(initializedHobbiesPageSuccess(true));
        });
};
