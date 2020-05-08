import {applyMiddleware,createStore, compose, combineReducers} from "redux"
import mainPageReducer from "./reducers/mainPage-reducer";
import hobbyPageReducer from "./reducers/hobbyCard-reducer";
import userCabinetReducer from "./reducers/user-reducer";
import searchPageReducer from './reducers/search-reducer';
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from "redux-thunk";
import appReducer from "./reducers/app-reducer";
import ProviderCabinetReducer from "./reducers/provider-reducer";

let reducers = combineReducers({
    mainPage: mainPageReducer,
    hobbyPage: hobbyPageReducer,
    searchPage: searchPageReducer,
    userCabinet: userCabinetReducer,
    form: formReducer,
    app: appReducer,
    providerCabinet: ProviderCabinetReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
