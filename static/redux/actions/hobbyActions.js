import axios from 'axios';
import { findHobbies, toggleAddingProgress } from '../reducers/hobbiesPage-reducer';
import { stopSubmit } from 'redux-form';
import * as actionTypes from './actionsTypes';
import { someFail } from './userActions';
import {reset} from 'redux-form'
import { setIsInSearchPage } from './searchActions';
import CommentApi from '../../api/Comment';

const commentApi = new CommentApi();
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

const setHobbyComments = comments =>({
    type: actionTypes.SET_HOBBY_COMMENTS,
    comments,
})

export const initializeHobbyPage = (Id) => (dispatch) => {
    dispatch(setIsInSearchPage(false));
    dispatch(initializedHobbyPage(false));
    axios.get(`/restapi/hobby/info?id=${Id}`).then(res => {
        let promise = dispatch(setHobbyData(res.data));
        axios.get(`/restapi/hobby/comments?id=${Id}`)
            .then(res => {
                let promise2 = dispatch(setHobbyComments(res.data));
                return (Promise.all([promise, promise2]).then(()=> {
                    dispatch(initializedHobbyPage(true));
                }))
            });
    })
        .catch(err => {
            dispatch(someFail(err))
        })
}


/*добавить отзыв. Отправляем is пользователя, id хобби, для которого этот отзыв.
Хотим, чтобы в бд автоматически сохранилась текущая дата к этому отзыву. Вернуть обновленный массив отзывов.*/
export const addUserFeedback = (hobbyId, body) => (dispatch) => {
    const obj = {
        text: body.text,
        evaluation: body.evaluation,
        datetime: body.datetime,
    };
    commentApi.stupidAddComment(obj, hobbyId)
        .then(res =>{
            if(res.ok){
            axios.get(`/restapi/hobby/comments?id=${hobbyId}`)
            .then(res => {
                console.log(res.data)
               dispatch(setHobbyComments(res.data));
               })}
            })
}

/*Добавить ответ провайдера на отзыв. Отправляем id провайдера, хобби. Хотим, чтобы вернулся обновленный массив отзывов и ответов.*/
export const addProviderResponse = (hobbyId, body, relatedId) => (dispatch) => {
    console.log("addProviderResponse")
    const obj = {
        text: body.text,
        datetime: body.datetime,
    };
    commentApi.providerAddAnswer(obj, hobbyId, relatedId)
        .then(res =>{
            if(res.ok){
                axios.get(`/restapi/hobby/comments?id=${hobbyId}`)
                    .then(res => {
                        console.log(res.data)
                        dispatch(setHobbyComments(res.data));
                    })}
        })
}

// функции, отпраправляющие запросы....
/*добавить хобби. Отправляем id хобби и юзера, если успех, хотим получить обновленный массив подписок*/
export const changeHobbyForUser = (hobbyID) => (dispatch) => {
    axios.get(`/restapi/user/subscribe?id=${hobbyID}`)
        .then(res => {
            axios.get(`/restapi/hobby/info?id=${hobbyID}`)
                .then(res => {
                    console.log(res.data)
                        dispatch(setHobbyData(res.data));
                    }
                );
        })
        .catch(err => {
            dispatch(someFail(err));
        });
};


/*добавить хобби. Отправляем id хобби и провайдера, если успех, хотим получить обновленный массив подписок*/
export const changeHobbyForProvider = (hobbyID) => (dispatch) => {
    axios.get(`/restapi/provider/subscribe?id=${hobbyID}`)
        .then(res => {
            axios.get(`/restapi/hobby/info?id=${hobbyID}`)
                .then(res => {
                    console.log(res.data);
                        dispatch(setHobbyData(res.data));
                    }
                );
        })
        .catch(err => {
            dispatch(someFail(err));
        });
}
