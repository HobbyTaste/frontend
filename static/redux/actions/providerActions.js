import { stopSubmit } from 'redux-form';
import axios from 'axios';
import { someFail, setIsUserInCabinet } from './userActions';
import * as actionTypes from './actionsTypes';
import ProviderApi from '../../api/Provider.ts';
import HobbyApi from '../../api/Hobby.ts';

const providerApi = new ProviderApi();
const hobbyApi = new HobbyApi();

export const setCurrentProviderInfo = (avatar, email, id, info, name, phone, providerIsAuth) => ({
    type: actionTypes.SET_PROVIDER_DATA, avatar, email, id, info, name, phone, providerIsAuth,
});
export const initializeProvider = (status) => ({ type: actionTypes.INITIALIZE_PROVIDER_SUCCESS, status });
export const setOwnHobbies = (providerHobbies) => ({ type: actionTypes.SET_OWN_HOBBIES, providerHobbies });
export const setFollowedHobbies = (followedHobbies) => ({ type: actionTypes.SET_FOLLOWED_HOBBIES, followedHobbies });
export const setProviderComments = (providerComments) => ({ type: actionTypes.SET_PROVIDER_COMMENTS, providerComments });
export const setIsProviderInCabinet = (status) => ({ type: actionTypes.SET_IS_PROVIDER_IN_CABINET, status});
const setFetchingOwnHobbies = (status) => ({ type: actionTypes.SET_FETCHING_OWN_HOBBIES, status});
const setFetchingFollowedHobbies = (status) => ({ type: actionTypes.SET_FETCHING_FOLLOWED_HOBBIES, status});

export function getProviderComments() {
    return async dispatch => {
        const responseBody = await (await providerApi.getComments()).json();
        dispatch(setProviderComments(responseBody));
    };
}

const changeProviderHobby = (userHobbies) => ({
    type: actionTypes.CHANGE_HOBBY_USER,
    userHobbies,
});

/* добавить хобби. Отправляем id хобби и провайдера, если успех, хотим получить обновленный массив подписок */
export const addHobbyForProvider = (hobbyID, userID) => (dispatch) => {
    console.log('provider add');
    axios.get(`/restapi/hobby/subscribe?id=${hobbyID}`).then((res) => {
        console.log('responce add');
        console.log(res);
        dispatch(changeProviderHobby(res.data.hobbies));
    })
        .catch((err) => {
            dispatch(someFail(err));
        });
};
/* удалить хобби. Отправляем id хобби и провайдера, если успех, хотим получить обновленный массив подписок */
export const deleteHobbyForProvider = (hobbyID, providerID) => (dispatch) => {
    axios.get(`/restapi/hobby/subscribe?id=${hobbyID}`).then((res) => {
        console.log('responce delete');
        console.log(res);
        dispatch(changeProviderHobby(res.data.hobbies));
    })
        .catch((err) => {
            dispatch(someFail(err));
        });
};

export const getCurrentProviderInfo = () => async dispatch => {
    const response = await providerApi.getInfo();
    if (response.ok) {
        const { avatar, email, id, info, name, phone } = await response.json();
        dispatch(setCurrentProviderInfo(avatar, email, id, info, name, phone, true));
    }
}

export const getOwnHobbies = () => async (dispatch) => {
    const response = await providerApi.getOwnHobbies();
    if (response.ok) {
        const body = await response.json();
        dispatch(setOwnHobbies(body));
    } else {
        console.log(await response.json());
    }
}

export const getFollowedHobbies = () => async dispatch => {
    const response = await providerApi.getFollowedHobbies();
    if (response.ok) {
        const body = await response.json();
        dispatch(setFollowedHobbies(body));
    } else {
        console.log(await response.json());
    }
}

export const initializeProviderCabinet = () => async dispatch => {
    dispatch(initializeProvider(false));
    dispatch(setIsProviderInCabinet(false));
    await dispatch(getCurrentProviderInfo());
    await dispatch(getProviderComments());
    dispatch(initializeProvider(true));
    dispatch(setIsProviderInCabinet(true));
};

export const initializeFollowedHobbies = () => async dispatch => {
    dispatch(setFetchingFollowedHobbies("loading"));
    await dispatch(getFollowedHobbies());
    dispatch(setFetchingFollowedHobbies("success"));
};

export const createNewProvider = (name, password, email) => (dispatch) => {
    const providerData = {
        name, password, email
    };
    providerApi.create(providerData).then((response) => {
        console.log(response);
        if (response.ok) {
            dispatch(getCurrentProviderInfo());
        }
        else  {
            dispatch(stopSubmit("registration", { error: "Пользователь уже существует" }));
        }
    });
};

export const loginProvider = (email, password) => (dispatch) => {
    providerApi.login(email, password).then((response) => {
        if (response.ok) {
            dispatch(getCurrentProviderInfo());
        }
        else  {
                dispatch(stopSubmit("login", { email: "Неверный email или пароль" }));
            }
    })
};

export const logoutProvider = () => (dispatch) => {
    providerApi.logout().then((response) => {
        if (response.ok) {
            dispatch(setCurrentProviderInfo(null, null, null, null, null,
                null, false));
        } else {
            response.json().then(console.log);
        }
    });
};

export const addNewHobby = (hobbyData) => async (dispatch) => {
    const response = await hobbyApi.add(hobbyData);
    if (response.ok) {
        dispatch(getOwnHobbies());
        return Promise.resolve();
    }
    else return Promise.reject(response);
};

export const providerEdit = (editData) => (dispatch) => {
    providerApi.edit(editData).then((response) => {
        if (response.ok) {
            dispatch(getCurrentProviderInfo());
        } else {
            response.json().then(console.log);
        }
    });
};
