import { stopSubmit } from 'redux-form';
import User from '../../api/User.ts';

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
    id: null,
    email: null,
    name: null,
    avatar: null,
    password: null,
    isAuth: false,
    inUserCabinet: false,
};
const userApi = new User();

const authReducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_USER_DATA:
        return {
            ...state,
            id: action.id,
            email: action.email,
            name: action.name,
            avatar: action.avatar,
            password: action.password,
            isAuth: action.isAuth,
        };
    default:
        return state;
    }
};

export const setAuthUserData = (id, email, name, avatar, password, isAuth) => ({
    type: SET_USER_DATA, id, email, name, avatar, password, isAuth,
});
export default authReducer;

export const getAuthUserData = () => (dispatch) => userApi.getInfo()
    .then((response) => {
        if (typeof response === 'object') {
            /*debugger;*/
            const { id, name, email, avatar, password } = response;
            dispatch(setAuthUserData(id, email, name, avatar, password, true));
        }
    });

export const login = (email, password) => (dispatch) => {
    let promise = dispatch(getUserHobbies());
    userApi.login(email, password)
        .then((response) => {
            if (response === null) {
                dispatch(getAuthUserData());
            } else if (response.login) {
                dispatch(stopSubmit('login', { email: 'Неверный email' }));
            } else if (response.password) {
                dispatch(stopSubmit('login', { password: 'Неверный пароль' }));
            }
        });
};

export const createNewUser = (email, password, name, avatar) => (dispatch) => {
    const obj = {
        password: password, name: name, avatar: avatar, email: email
    };
    userApi.create(obj).then((response) => {
        if (response.ok) {
            dispatch(getAuthUserData());
        }
    });
};

export const logout = () => (dispatch) => {
    userApi.logout()
        .then((response) => {
            if (response === null) {
                dispatch(setAuthUserData(null, null, null,
                    null, null, false));
            }
        });
};

/*
export const addNewHobby = (hobbyID) => (dispatch) => {
    userApi.addHobby(hobbyID)
        .then((response) => {
            if(response.ok) {
                dispatch()
            }
        });
};*/
