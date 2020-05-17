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
    fetchedOwnHobbies: "no information",
    fetchedFollowedHobbies: "no information",
    ownHobbies: [],
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
        case actionTypes.SET_FOLLOWED_HOBBIES: {
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
        case actionTypes.SET_FETCHING_FOLLOWED_HOBBIES:
            return {
                ...state,
                fetchedFollowedHobbies: action.status
            };
        case actionTypes.SET_FETCHING_OWN_HOBBIES:
            return {
                ...state,
                fetchedOwnHobbies: action.status
            }
        case actionTypes.SET_IS_PROVIDER_IN_CABINET:
            return {
                ...state,
                isProviderInCabinet: action.status
            }
        case actionTypes.SET_OWN_HOBBIES:
            return {
              ...state, ownHobbies: action.providerHobbies
            };
        default:
            return state;
    }
};

export default ProviderCabinetReducer;
