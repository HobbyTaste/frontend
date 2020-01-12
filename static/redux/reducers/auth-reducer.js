import {stopSubmit} from 'redux-form';
import User from '../../api/User.ts';
import {findHobbies, toggleAddingProgress} from "./hobbiesPage-reducer";

const SET_HOBBIES = 'SET_HOBBIES';
const SET_USER_DATA = 'SET_USER_DATA';
const INITIALIZE_USER_SUCCESS = 'INITIALIZE_USER_SUCCESS';

const initialState = {
    id: null,
    email: null,
    name: null,
    avatar: null,
    isAuth: false,
    inUserCabinet: false,
    userInitialized: false,

    userHobbies: []
};
const userApi = new User();

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_USER_SUCCESS: {
            return {
                ...state, userInitialized: action.initialize
            };
        }
        case SET_USER_DATA:
            return {
                ...state,
                id: action.id,
                email: action.email,
                name: action.name,
                avatar: action.avatar,
                isAuth: action.isAuth
            };
        case SET_HOBBIES:
            return {
                ...state, userHobbies: action.userHobbies
            };
        default:
            return state;
    }
};

export const setAuthUserData = (id, email, name, avatar, isAuth) => ({
    type: SET_USER_DATA, id, email, name, avatar, isAuth
});
const setUserHobbies = (userHobbies) => ({type: SET_HOBBIES, userHobbies});
const initializeUser = (initialize) => ({type: INITIALIZE_USER_SUCCESS, initialize});

export const initializeUserCabinet = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    let promise2 = dispatch(getUserHobbies());
    Promise.all([promise, promise2])
        .then(() => {
            dispatch(initializeUser(true));
        });
};

export const getUserHobbies = () => (dispatch) => {
    userApi.getHobbies()
        .then((response) => {
            if (response.ok) {
                response.json().then(body => {
                    dispatch(setUserHobbies(body));
                });
            }
        })
};

export const addNewHobby = (hobbyID, type, metro) => (dispatch) => {
    userApi.addHobby(hobbyID)
        .then((response) => {
            dispatch(toggleAddingProgress(true, hobbyID));
            if (response.ok) {
                dispatch(getUserHobbies());
                dispatch(findHobbies(type, metro))
            }
        });
    dispatch(toggleAddingProgress(false, hobbyID));
};

export const getAuthUserData = () => (dispatch) => userApi.getInfo()
    .then((response) => {
        if (typeof response === 'object') {
            const {id, name, email, avatar} = response;
            dispatch(setAuthUserData(id, email, name, avatar, true));
        }
    });

export const login = (email, password) => (dispatch) => {
    userApi.login(email, password)
        .then((response) => {
            if (response === null) {
                dispatch(getAuthUserData());
                dispatch(getUserHobbies());
            } else if (response.login) {
                dispatch(stopSubmit('login', {email: 'Неверный email'}));
            } else if (response.password) {
                dispatch(stopSubmit('login', {password: 'Неверный пароль'}));
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
                    null, false));
                dispatch(initializeUser(false));
            }
        });
};

export const userEdit = (editData) => (dispatch) => {
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