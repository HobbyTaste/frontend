import { stopSubmit } from 'redux-form';
import axios from 'axios';
import { someFail, setIsUserInCabinet } from './userActions';
import * as actionTypes from './actionsTypes';
import ProviderApi from '../../api/Provider.ts';
import HobbyApi from '../../api/Hobby.ts';

const providerApi = new ProviderApi();
const hobbyApi = new HobbyApi();

export const setAuthProviderData = (avatar, email, id, info, name, phone, providerIsAuth) => ({
    type: actionTypes.SET_PROVIDER_DATA, avatar, email, id, info, name, phone, providerIsAuth,
});
export const initializeProvider = (status) => ({ type: actionTypes.INITIALIZE_PROVIDER_SUCCESS, status });
export const setProviderHobbies = (providerHobbies) => ({ type: actionTypes.SET_PROVIDER_HOBBIES, providerHobbies });


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

// дальше идут старые, которые скорее всего поменяются

export const getAuthProviderData = () => (dispatch) => providerApi.getInfo()
    .then((response) => {
        if (response.ok) {
            response.json().then((body) => {
                const {
                    avatar, email, id, info, name, phone,
                } = body;
                dispatch(setAuthProviderData(avatar, email, id, info, name, phone, true));
            });
        } else {
            response.json().then(console.log);
        }
    });

export const getProviderHobbies = () => (dispatch) => providerApi.getHobbies()
    .then((response) => {
        if (response.ok) {
            response.json().then((body) => {
                dispatch(setProviderHobbies(body));
            });
        } else {
            response.json().then(console.log);
        }
    });

export const initializeProviderCabinet = () => (dispatch) => {
    dispatch(initializeProvider(false));
    dispatch(setIsUserInCabinet(false));
    const promise = dispatch(getAuthProviderData());
    const promise2 = dispatch(getProviderHobbies());
    Promise.all([promise, promise2])
        .then(() => {
            dispatch(initializeProvider(true));
        });
};

export const createNewProvider = (name, password, email, avatar, phone, info) => (dispatch) => {
    const providerData = {
        name: name, password: password, email: email, avatar: avatar, info: info
    };
    providerApi.create(providerData).then((response) => {
        if (response.ok) {
            dispatch(getAuthProviderData());
        }
        else  {
            dispatch(stopSubmit("registration", { error: "Пользователь уже существует" }));
        }
    });
};

export const loginProvider = (email, password) => (dispatch) => {
    providerApi.login(email, password).then((response) => {
        if (response.ok) {
            dispatch(getAuthProviderData());
        }
        else  {
                dispatch(stopSubmit("login", { email: "Неверный email или пароль" }));
            }
    })
};

export const logoutProvider = () => (dispatch) => {
    providerApi.logout().then((response) => {
        if (response.ok) {
            dispatch(setAuthProviderData(null, null, null, null, null,
                null, false));
        } else {
            response.json().then(console.log);
        }
    });
};

export const addNewHobby = (organization, telephone, email, address, metro, info, providerId, file, category) => (dispatch) => {
    const hobbyData = {
        label: organization,
        phone: telephone,
        email,
        address,
        metroStation: metro,
        description: info,
        shortDescription: info,
        owner: providerId,
        avatar: file,
        category,
    };
    hobbyApi.add(hobbyData).then((response) => {
        if (response.ok) {
            dispatch(getProviderHobbies());
        }
    });
};

export const providerEdit = (editData) => (dispatch) => {
    providerApi.edit(editData).then((response) => {
        if (response.ok) {
            dispatch(getAuthProviderData());
        } else {
            response.json().then(console.log);
        }
    });
};
