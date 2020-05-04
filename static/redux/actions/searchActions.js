import * as actionTypes from '../actions/actionsTypes'
import { someFail } from './userActions';
import {categories} from '../../utils/constant'
import React from 'react';
import axios from 'axios';

export const setHobbiesToSearch = (hobbiesToSearch) => ({type: actionTypes.SET_HOBBIES_TO_SEARCH, hobbiesToSearch});
export const initializedSearchPageSuccess = (initialize) => ({type: actionTypes.INITIALIZED_SEARCH_SUCCESS, initialize});
export const setSearchWordSuccess = (searchWord) => ({type: actionTypes.SET_SEARCH_WORD, searchWord});
export const setIsInSearchPage = (isInSearchPage) =>({type: actionTypes.SET_IN_SEARCH_PAGE, isInSearchPage});
export const setCategorySuccess = (category) => ({type: actionTypes.SET_CATEGORY, category});
export const setFilterSuccess = (filter) => ({type: actionTypes.SET_FILTER, filter});




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

export const getHobbies = (hobbyType) => (dispatch) => {
    const obj = {category: hobbyType};
    return hobbyApi.getWithFilter(obj)
        .then((response) => {
            if (response.ok) {
                response.json().then(body => {
                    let ans = body.map(hobby => ({
                        label: hobby.label,
                        value: hobby.label
                    }));
                    const filteredLabels = removeDuplicates(ans);
                    dispatch(setHobbiesToSelect(filteredLabels));
                });
            } else {
                response.json().then(console.log);
            }
        })
};

export const setCategory= (category) => (dispatch) => {
    if (!(category === undefined)) {
        dispatch(setCategorySuccess(category));
    }
};

export const setFilter= (filterArray) => (dispatch) => {
    if (!(filterArray === undefined)) {
        dispatch(setFilterSuccess(filterArray));
    }
};

export const initializeSearchPage = (searchWord, category) => (dispatch) => {
    dispatch(initializedSearchPageSuccess(false));
    setHobbiesToSearch([]);
    setFilterSuccess([]);
    axios.get(`/restapi/hobby/find?label=${searchWord}`).then(res => {
        let promise = dispatch(setHobbiesToSearch(res.data));
        let promise3 =   setCategorySuccess('Все категории');
        if (category !== undefined) {promise3 = dispatch(setCategorySuccess(category))}
        return (Promise.all([promise, promise3]).then(()=> {
            dispatch(setIsInSearchPage(true));
            dispatch(initializedSearchPageSuccess(true));
        }))
    })
        .catch(err => {
            dispatch(someFail(err))
        })
};


export const updateSearch = (searchWord) => (dispatch) => {
    axios.get(`/restapi/hobby/find?label=${searchWord}`).then(res => {
        let promise = dispatch(setHobbiesToSearch(res.data));
        let promise3 = dispatch(setCategorySuccess('Все категории'));
        return (Promise.all([promise, promise3]).then(()=> {
            dispatch(setSearchWordSuccess(searchWord));}))
    })
        .catch(err => {
            dispatch(someFail(err))
        })
};


export const unsetCategory= () => (dispatch) => {
    dispatch(setCategorySuccess('Все категории'));
};


export const setCategoryFromNavigation= (category) => (dispatch) => {
    axios.get(`/restapi/hobby/all`).then(res => {
        let promise3 = dispatch(setSearchWordSuccess(''));
        let promise = dispatch(setHobbiesToSearch(res.data));
        return (Promise.all([promise, promise3]).then(()=> {
            dispatch(setCategorySuccess(category));}))
    })
        .catch(err => {
            dispatch(someFail(err))
        })
};


export function getLabelByUrlCategory(url_) {
    for (let i in categories){
        if (categories[i].url === url_){
            return categories[i].label;
        }
    }
    return "Все категории";
}

