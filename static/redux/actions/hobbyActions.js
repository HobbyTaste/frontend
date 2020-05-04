import axios from 'axios';
import { findHobbies, toggleAddingProgress } from '../reducers/hobbiesPage-reducer';
import { stopSubmit } from 'redux-form';
import * as actionTypes from './actionsTypes';
import { someFail } from './userActions';
import {reset} from 'redux-form'
import { setIsInSearchPage } from './searchActions';
// Actions:
const initializedHobbyPage = (initialized) => ({
    type: actionTypes.INITIALIZE_HOBBY_PAGE,
    initialized
});
const changeComments = comment => ({
    type: actionTypes.ADD_RESPONSE,
    comment
});

const setHobbyData = payload =>({
    type: actionTypes.SET_HOBBY_DATA,
    payload,
})

const changeUserHobby=(userHobbies) => ({
    type: actionTypes.CHANGE_HOBBY_USER,
    userHobbies
})


export const initializeHobbyPage = (Id) => (dispatch) => {
    dispatch(setIsInSearchPage(false));
    dispatch(initializedHobbyPage(false));
    axios.get(`/restapi/hobby/info?id=${Id}`).then(res => {
        console.log(res);
        let promise = dispatch(setHobbyData(res.data));
        return (Promise.all([promise]).then(()=> {
            dispatch(initializedHobbyPage(true));
        }))
    })
        .catch(err => {
            dispatch(someFail(err))
        })
}


/*добавить отзыв. Отправляем is пользователя, id хобби, для которого этот отзыв.
Хотим, чтобы в бд автоматически сохранилась текущая дата к этому отзыву. Вернуть обновленный массив отзывов.*/
export const addUserFeedback = (hobbyID, values) => (dispatch) => {
    console.log("addUserFeedback")
    axios.post(`/restapi/hobby/edit?=${hobbyID}`, {
        text: values.TextFeedback,
        stars: values.StarsRating,
    }).then(res => {
        dispatch(reset('addFeedback'));
        dispatch(changeComments(res.data.comments));
    })
        .catch(err => {
            dispatch(someFail(err))
        })
}

/*Добавить ответ провайдера на отзыв. Отправляем id провайдера, хобби. Хотим, чтобы вернулся обновленный массив отзывов и ответов.*/
export const addProviderResponse = (hobbyID, providerID, values) => (dispatch) => {
    console.log("addProviderResponse")
    axios.post('http://127.0.0.1:8100/user/subscribe', {
        hobbyId: hobbyID,
        values: values,
    }).then(res => {
        console.log("addProvider Responce")
        console.log(res)
        dispatch(changeComments(res.data.comments));
    })
        .catch(err => {
            dispatch(someFail(err))
        })
}
