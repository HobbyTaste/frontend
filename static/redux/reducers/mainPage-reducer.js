import {getMetroStations} from "../../api/Geo";
import Hobby from "../../api/Hobby";
import { setIsUserInCabinet, someFail } from '../actions/userActions';
import { setCategorySuccess, setHobbiesToSearch, setIsInSearchPage, setSearchWordSuccess } from '../actions/searchActions';
import axios from 'axios';

const SET_HOBBIES_TOP = 'SET_HOBBIES_TOP';
const SET_HOBBIES_WIDGET = 'SET_HOBBIES_WIDGET';
const SET_HOBBIES_POSTER = 'SET_HOBBIES_POSTER';
const INITIALIZED_MAIN_PAGE_SUCCESS = 'INITIALIZED_MAIN_PAGE_SUCCESS';

const hobbyApi = new Hobby();

let initialState = {
    hobbiesTop: [],
    hobbiesWidget: [],
    hobbiesPoster: [],
    initializedMainPage: false
};

const mainPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HOBBIES_TOP:
            return {
                ...state, hobbiesTop: action.hobbiesTop
            };
        case SET_HOBBIES_WIDGET:
            return {
                ...state, hobbiesWidget: action.hobbiesWidget,
            };
        case SET_HOBBIES_POSTER:
            return {
                ...state,  hobbiesPoster: action.hobbiesPoster
            };
        case INITIALIZED_MAIN_PAGE_SUCCESS:
            return {
                ...state, initializedMainPage: action.initialize
            };
        default:
            return state;
    }
};

export const setHobbiesTop = (hobbiesTop) => ({type: SET_HOBBIES_TOP, hobbiesTop});
export const setHobbiesWidget = (hobbiesWidget) => ({type: SET_HOBBIES_WIDGET, hobbiesWidget});
export const setHobbiesPoster = (hobbiesPoster) => ({type: SET_HOBBIES_POSTER, hobbiesPoster});
export const initializedMainPageSuccess = (initialize) => ({type: INITIALIZED_MAIN_PAGE_SUCCESS, initialize});
export default mainPageReducer;

export const getMetro = () => (dispatch) => {
    return getMetroStations()
        .then((response) => {
            let metroStations = response;
            dispatch(setMetroStations(metroStations));
            let tmpAns = response.map(station => station.caption);
            let idAndStation = response.map(station => ({label: station.caption, id: station.id}));
            let ans = idAndStation.map(station => ({
                label: station.label,
                value: station.id
            }));
            dispatch(setStationsToSelect(ans));
        })
};

function removeDuplicates(arr) {
    const result = [];
    const duplicatesIndices = [];
    arr.forEach((current, index) => {
        if (duplicatesIndices.includes(index)) return;
        result.push(current);
        for (let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++) {
            const comparison = arr[comparisonIndex];
            const currentKeys = Object.keys(current);
            const comparisonKeys = Object.keys(comparison);
            if (currentKeys.length !== comparisonKeys.length) continue;
            const currentKeysString = currentKeys.sort().join("").toLowerCase();
            const comparisonKeysString = comparisonKeys.sort().join("").toLowerCase();
            if (currentKeysString !== comparisonKeysString) continue;
            let valuesEqual = true;
            for (let i = 0; i < currentKeys.length; i++) {
                const key = currentKeys[i];
                if ( current[key] !== comparison[key] ) {
                    valuesEqual = false;
                    break;
                }
            }
            if (valuesEqual) duplicatesIndices.push(comparisonIndex);
        }
    });
    return result;
}


export const initializeMainPage = () => (dispatch) => {
    dispatch(initializedMainPageSuccess(false));
    dispatch(setIsUserInCabinet(false));
    dispatch(setIsInSearchPage(false));
    axios.get(`/restapi/hobby/all`).then(res => {
        let promise = dispatch(setHobbiesTop(res.data));
        let promise2 = dispatch(setHobbiesWidget(res.data));
        let promise3 =dispatch(setHobbiesPoster(res.data));
        return (Promise.all([promise,promise2, promise3]).then(()=> {
            dispatch(initializedMainPageSuccess(true));}))
    })
        .catch(err => {
            dispatch(someFail(err))
        })
};
