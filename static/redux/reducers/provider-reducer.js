import Provider from "../../api/Provider";
import Hobby from "../../api/Hobby";
import {stopSubmit} from "redux-form";

const SET_PROVIDER_DATA = 'SET_PROVIDER_DATA';
const INITIALIZE_PROVIDER_SUCCESS = 'INITIALIZE_PROVIDER_SUCCESS';
const SET_PROVIDER_HOBBIES = 'SET_PROVIDER_HOBBIES';

const providerApi = new Provider();
const hobbyApi = new Hobby();

let initialState = {
    providerId: '',
    name: '',
    email: '',
    avatar: '',
    phone: '',
    info: '',
    category: '',
    providerIsAuth: false,
    providerInitialized: false,
    providerHobbies: []
};

const ProviderCabinetReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROVIDER_DATA: {
            return {
                ...state, providerId: action.id,
                name: action.name,
                email: action.email,
                avatar: action.avatar,
                phone: action.phone,
                info: action.info,
                providerIsAuth: action.providerIsAuth
            }
        }
        case INITIALIZE_PROVIDER_SUCCESS: {
            return {
                ...state, providerInitialized: true
            }
        }
        case SET_PROVIDER_HOBBIES:
            return {
              ...state, providerHobbies: action.providerHobbies
            };
        default:
            return state;
    }
};

export const setAuthProviderData = (avatar, email, id, info, name, phone, providerIsAuth) =>
    ({type: SET_PROVIDER_DATA, avatar, email, id, info, name, phone, providerIsAuth});
export const initializeProvider = () => ({type: INITIALIZE_PROVIDER_SUCCESS});
export const setProviderHobbies = (providerHobbies) => ({type: SET_PROVIDER_HOBBIES, providerHobbies});

export const initializeProviderCabinet = () => (dispatch) => {
    let promise = dispatch(getAuthProviderData());
    let promise2 = dispatch(getProviderHobbies());
    Promise.all([promise, promise2])
        .then(() => {
            dispatch(initializeProvider());
        });
};

export const getAuthProviderData = () => (dispatch) => {
    return providerApi.getInfo()
        .then(response => {
            if (response.ok) {
                response.json().then(body => {
                    let {avatar, email, id, info, name, phone} = body;
                    dispatch(setAuthProviderData(avatar, email, id, info, name, phone, true));
                });
            } else {
                response.json().then(console.log);
            }
        });
};

export const getProviderHobbies = () => (dispatch) => {
    return providerApi.getHobbies()
        .then(response => {
            if (response.ok) {
                response.json().then(body => {
                    dispatch(setProviderHobbies(body));
                });
            } else {
                response.json().then(console.log);
            }
        })
};

export const createNewProvider = (name, password, email, avatar, phone, info) => (dispatch) => {
    const providerData = {
        name: name, password: password, email: email, avatar: avatar, phone: phone, info: info
    };
    providerApi.create(providerData).then((response) => {
        if (response.ok) {
            dispatch(getAuthProviderData());
        } else {
            response.json().then(console.log);
        }
    })
};

export const loginProvider = (email, password) => (dispatch) => {
    providerApi.login(email, password).then((response) => {
        if (response.ok) {
            dispatch(getAuthProviderData());
        }
        else {
            response.json().then(console.log);
        }
        /*else {
                if(response.login) {
                    dispatch(stopSubmit("providerLogin", {email: "Неверный email"}));
                }
                else if(response.password) {
                    dispatch(stopSubmit("providerLogin", {password: "Неверный пароль"}));
                }
            /!*response.json().then(console.log);*!/
        }*/
    })
};

export const logoutProvider = () => (dispatch) => {
    providerApi.logout().then((response) => {
        if (response.ok) {
            debugger;
            dispatch(setAuthProviderData(null, null, null, null, null,
                null, false));
        } else {
            response.json().then(console.log);
        }
    })
};

export const addNewHobby = (organization, telephone, email, address, metro, info, providerId, file, category) => (dispatch) => {
    const hobbyData = {
        label: organization, phone: telephone, email: email, address: address, metroStation: metro,
        description: info, shortDescription: info, owner: providerId, avatar: file, category: category
    };
    hobbyApi.add(hobbyData).then((response) => {
        if (response.ok) {
            dispatch(getProviderHobbies())
        }
    })
};

export const providerEdit = (editData) => (dispatch) => {
    providerApi.edit(editData).then((response) => {
        if (response.ok) {
            dispatch(getAuthProviderData());
        } else {
            response.json().then(console.log);
        }
    })
};

export default ProviderCabinetReducer;