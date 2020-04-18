import axios from 'axios';
import { findHobbies, toggleAddingProgress } from '../reducers/hobbiesPage-reducer';
import { stopSubmit } from 'redux-form';
import * as actionTypes from './actionsTypes';
import { someFail } from './userActions';
import {reset} from 'redux-form'
// Actions:
const initializedPageSuccess = (initialized) => ({
    type: actionTypes.INITIALIZE_HOBBY_PAGE,
    initialized
});
const changeComments = comment => ({
    type: actionTypes.ADD_RESPONSE,
    comment
});

const editHobby = payload=> ({
    type: actionTypes.EDIT_PAGE,
    payload
});


// теперь какие-то функции....
/*добавить отзыв. Отправляем is пользователя, id хобби, для которого этот отзыв.
Хотим, чтобы в бд автоматически сохранилась текущая дата к этому отзыву. Вернуть обновленный массив отзывов.*/
export const addUserFeedback = (hobbyID, userID, values) => (dispatch) => {
    console.log("addUserFeedback")
    axios.post('http://127.0.0.1:8080/user/subscribe', {
        hobbyId: hobbyID,
        userId: userID,
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
        providerId: providerID,
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
