import * as actionTypes from '../actions/actionsTypes'
import { someFail } from './userActions';
import {categories} from '../../utils/constant'
import style from '../../components/SearchPage/Content/Content.css';
import Slot from '../../components/MainPage/Slot/Slot';
import React from 'react';

export const setHobbiesToSearch = (hobbiesToSearch) => ({type: actionTypes.SET_HOBBIES_TO_SEARCH, hobbiesToSearch});
export const initializedSearchPageSuccess = (initialize) => ({type: actionTypes.INITIALIZED_SEARCH_SUCCESS, initialize});
export const setSearchWordSuccess = (searchWord) => ({type: actionTypes.SET_SEARCH_WORD, searchWord});
export const setIsInSearchPage = (isInSearchPage) =>({type: actionTypes.SET_IN_SEARCH_PAGE, isInSearchPage});
export const setHobbiesShow = (hobbiesShow) => ({type: actionTypes.SET_HOBBY_SHOW, hobbiesShow});
export const setCategorySuccess = (category) => ({type: actionTypes.SET_CATEGORY, category});

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
const getHobbiesByWord  = (word) => new Promise(resolve => {
    setTimeout(() => resolve( {data: [{id: 1, pic: "https://images.wallpaperscraft.com/image/skateboard_skateboarder_hobby_116485_1600x1200.jpg", label: "Название" ,metro: "Новая станция", description:"Описание", contact:{mobile: "+7 999", email: "ааа"}, flag:{isParking: true,
                isBeginner: true, isChild: true, isRent: true,}},
            {id: 2, label: "Название2" ,metro: "Новая станция2", description:"Описание", contact:{mobile: "+7 999", email: "ааа"}, flag:{isParking: true,
                    isBeginner: true,
                    isRent: false,}},
        ]}), 1000)
})


export const initializeSearchPage = (searchWord) => (dispatch) => {
    dispatch(initializedSearchPageSuccess(false));
    getHobbiesByWord(searchWord).then(res => {
        let promise = dispatch(setHobbiesToSearch(res.data));
        return (Promise.all([promise]).then(()=> {
            dispatch(setIsInSearchPage(true));
            dispatch(initializedSearchPageSuccess(true));
        }))
    })
        .catch(err => {
            dispatch(someFail(err))
        })
};


export const setSearchWord = (searchWord) => (dispatch) => {
    dispatch(setSearchWordSuccess(searchWord));
};


export const filterHobby= (hobbies, filter, isChecked) => (dispatch) => {
    /*тут должна быть некоторая логика по фильтрации.*/
    let new_hobbies = hobbies;
    console.log(filter);
    dispatch(setHobbiesShow(new_hobbies));
};

export const setCategory= (hobbies, category) => (dispatch) => {
    dispatch(setCategorySuccess(category));
    let new_hobbies = hobbies;
    /*тут выбираем хобби, по новой категории*/
    dispatch(setHobbiesShow(new_hobbies));
};

export function getLabelByUrlCategory(url_) {
    for (let i in categories){
        if (categories[i].url === url_){
            console.log('yes');
            return categories[i].label;
        }
    }
    return "Все категории";
}


export const setSelector= (hobbies, selector) => (dispatch) => {
    let new_hobbies = hobbies;
    /*тут сортируем хобби по селектору*/
    dispatch(setHobbiesShow(new_hobbies));
};
