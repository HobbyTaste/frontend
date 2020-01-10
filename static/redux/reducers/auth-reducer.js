import { stopSubmit } from 'redux-form';
import User from '../../api/User.ts';
const ADD_NEW_HOBBY = 'ADD_NEW_HOBBY';
const SET_HOBBIES = 'SET_HOBBIES';
const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
    id: null,
    email: null,
    name: null,
    avatar: null,
    password: null,
    isAuth: false,
    inUserCabinet: false,

    userHobbies: []
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
        case SET_HOBBIES:
            return {
                ...state, userHobbies: action.userHobbies
            };
    default:
        return state;
    }
};

export const setAuthUserData = (id, email, name, avatar, password, isAuth) => ({
    type: SET_USER_DATA, id, email, name, avatar, password, isAuth,
});
const setUserHobbies = (userHobbies) => ({type: SET_HOBBIES, userHobbies});

export const getUserHobbies = () => (dispatch) => {
    userApi.getHobbies()
        .then((response) => {
            if(response.ok) {
                response.json().then(body => {
                    dispatch(setUserHobbies(body));
                });
            }
        })
};

export const addNewHobby = (hobbyID) => (dispatch) => {
    userApi.addHobby(hobbyID)
        .then((response) => {
            if(response.ok) {
                dispatch(getUserHobbies());
            }
        });
};

export const getAuthUserData = () => (dispatch) => userApi.getInfo()
    .then((response) => {
        if (typeof response === 'object') {
            const { id, name, email, avatar, password } = response;
            dispatch(setAuthUserData(id, email, name, avatar, password, true));
        }
    });

export const login = (email, password) => (dispatch) => {
    userApi.login(email, password)
        .then((response) => {
            if (response === null) {
                dispatch(getAuthUserData());
                dispatch(getUserHobbies());
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

export const userEdit = (editData) => (dispatch) => {
    debugger;
    userApi.edit(editData)
        .then((response) => {
            if (response.ok) {
                dispatch(getAuthUserData());
            } else {
                response.json().then(console.log);
            }
        });
};

export default authReducer;