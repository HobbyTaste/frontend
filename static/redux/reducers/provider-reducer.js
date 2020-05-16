import Provider from "../../api/Provider";
import Hobby from "../../api/Hobby";
import {stopSubmit} from "redux-form";
import * as actionTypes from '../actions/actionsTypes'
const providerApi = new Provider();
const hobbyApi = new Hobby();

let initialState = {
    id: '',
    name: '',
    phone: '',
    email: '',
    avatar: '',
    info: '',
    providerIsAuth: false,
    providerInitialized: false,
    providerHobbies: [],
    followedHobbies: [],
};

const ProviderCabinetReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PROVIDER_DATA: {
            return {
                ...state, id: action.id,
                name: action.name,
                email: action.email,
                avatar: action.avatar,
                phone: action.phone,
                info: action.info,
                providerIsAuth: action.providerIsAuth
            }
        }
        case actionTypes.INITIALIZE_PROVIDER_SUCCESS: {
            return {
                ...state, providerInitialized: action.status
            }
        }
        case actionTypes.CHANGE_HOBBY_FOLLOWED: {
            return {
                ...state,
                followedHobbies: action.followedHobbies
            }
        }
        case actionTypes.SET_PROVIDER_COMMENTS: {
            return {
                ...state,
                comments: action.providerComments
            };
        }
        case actionTypes.SET_FETCHING_PROVIDER_HOBBIES:
            return {
                ...state,
                fetchingHobbies: action.status
            };
        case actionTypes.SET_PROVIDER_HOBBIES:
            return {
              ...state, providerHobbies: action.providerHobbies
            };
        default:
            return state;
    }
};

export default ProviderCabinetReducer;
