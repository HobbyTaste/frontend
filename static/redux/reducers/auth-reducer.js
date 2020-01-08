import { stopSubmit } from 'redux-form';
import User from '../../api/User.ts';

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
    id: null,
    email: null,
    name: null,
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
            isAuth: action.isAuth,
        };
    default:
        return state;
    }
};

export const setAuthUserData = (id, email, name, isAuth) => ({
    type: SET_USER_DATA, id, email, name, isAuth,
});
export default authReducer;

export const getAuthUserData = () => (dispatch) => userApi.getInfo()
    .then((response) => {
        if (typeof response === 'object') {
            const { id, name, email } = response;
            dispatch(setAuthUserData(id, email, name, true));
        }
    });

export const login = (email, password) => (dispatch) => {
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

export const createNewUser = (email, password, name) => (dispatch) => {
    userApi.create(email, password, name).then((response) => {
        if (response === null) {
            dispatch(getAuthUserData());
        }
    });
};

export const logout = () => (dispatch) => {
    userApi.logout()
        .then((response) => {
            if (response === null) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        });
};