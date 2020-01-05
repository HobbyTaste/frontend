import {getMetroStations} from "../../api/Geo";
import Hobby from "../../api/Hobby";

const SET_HOBBIES = 'SET-HOBBIES';
const SET_HOBBIES_TO_SELECT = 'SET_HOBBIES_TO_SELECT';
const SET_METRO_STATIONS = 'SET-METRO-STATIONS';
const SET_STATIONS_TO_SELECT = 'SET-STATIONS-TO-SELECT';
const SUBMIT = 'SUBMIT';
const INITIALIZED_MAIN_PAGE_SUCCESS = 'INITIALIZED_MAIN_PAGE_SUCCESS';

const hobbyApi = new Hobby();

let initialState = {
    hobbies: [],
    hobbiesToSelect: [],
    metroStations: [],
    metroStationsToSelect: [],
    isSubmit: false,
    initializedMainPage: false
};

const mainPageReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_HOBBIES:
            return {
                ...state, hobbies: action.hobbies
            };
        case SET_HOBBIES_TO_SELECT:
            return {
                ...state, hobbiesToSelect: action.hobbiesToSelect
            };
        case SET_METRO_STATIONS:
            return {
                ...state, metroStations: action.stations,
            };
        case SET_STATIONS_TO_SELECT:
            return {
              ...state, metroStationsToSelect: action.stationsToSelect
            };
        case SUBMIT:
            return {
                ...state, isSubmit: true
            };
        case INITIALIZED_MAIN_PAGE_SUCCESS:
            return {
                ...state, initializedMainPage: true
            };
        default:
            return state;
    }
};

export const setHobbies = (hobbies) => ({ type: SET_HOBBIES, hobbies});
export const setHobbiesToSelect = (hobbiesToSelect) => ({ type: SET_HOBBIES_TO_SELECT, hobbiesToSelect});

export const setMetroStations = (stations) => ({ type: SET_METRO_STATIONS, stations});
export const setStationsToSelect = (stationsToSelect) => ({ type: SET_STATIONS_TO_SELECT, stationsToSelect});
export const setSubmit = () => ({type: SUBMIT});
export const initializedMainPageSuccess = () => ({type: INITIALIZED_MAIN_PAGE_SUCCESS});
    export default mainPageReducer;

export const getMetro = () => (dispatch) => {
    return getMetroStations()
        .then((response) => {
            let metroStations = response;
            dispatch(setMetroStations(metroStations));
            let tmpAns = response.map(station => station.caption);
            let ans = tmpAns.map(station => ({label: station,
                                                        value: station}));
            dispatch(setStationsToSelect(ans));
        })
};

export const getHobbies = () => (dispatch) => {
    return hobbyApi.getAll()
        .then((response) => {
            if (response.ok) {
                response.json().then(body => {
                    dispatch(setHobbies(body));
                    let ans = body.map(hobby => ({label: hobby.label,
                        value: hobby.label}));
                    dispatch(setHobbiesToSelect(ans));
                });
            } else {
                response.json().then(console.log);
            }
        })
};

export const findHobbies = (label, metroId) => (dispatch) => {
    return hobbyApi.find(label, metroId)
        .then((response) => {
            if(response.ok) {

            }
        })
};

export const initializeMainPage = () => (dispatch) => {
    let promise = dispatch(getMetro());
    let promise2 = dispatch(getHobbies());
    Promise.all([promise, promise2])
        .then(() => {
            dispatch(initializedMainPageSuccess());
        });
};
