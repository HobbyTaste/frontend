import { setIsUserInCabinet, someFail } from './userActions';
import { setIsInSearchPage } from './searchActions';
import axios from 'axios';
import { initializedMainPageSuccess, setHobbiesPoster, setHobbiesTop, setHobbiesWidget } from '../reducers/mainPage-reducer';
import { sortByTypeMonitization } from '../../utils/functions';

export const getHobbies = () => (dispatch) => {
    axios.get(`/restapi/hobby/all`).then(res => {
        let hobbies = sortByTypeMonitization(res.data, 0);
        if (hobbies.length < 3) {
            hobbies = res.data.slice(0, 10);
        }
        let promise = dispatch(setHobbiesTop(hobbies));
        hobbies= sortByTypeMonitization(res.data, 1);
        if (hobbies.length < 3) {
            hobbies = res.data.slice(0, 3);
        }
        let promise2 = dispatch(setHobbiesWidget(hobbies));
        hobbies= sortByTypeMonitization(res.data, 2);
        if (hobbies.length === 0) {
            hobbies = res.data.slice(0, 5);
        }
        let promise3 =dispatch(setHobbiesPoster(hobbies));
        return (Promise.all([promise,promise2, promise3]).then(()=> {
            dispatch(initializedMainPageSuccess(true));}))
    })
        .catch(err => {
            dispatch(someFail(err))
        })
};

export const initializeMainPage = () => (dispatch) => {
    dispatch(initializedMainPageSuccess(false));
    dispatch(setIsUserInCabinet(false));
    dispatch(setIsInSearchPage(false));
    dispatch(getHobbies());
};

export const changeHobbyForProvider = (hobbyID) => (dispatch) => {
    axios.get(`/restapi/provider/subscribe?id=${hobbyID}`)
        .then(res => {
            dispatch(getHobbies());
        });
};



export const changeHobbyForUser = (hobbyID) => (dispatch) => {
    axios.get(`/restapi/user/subscribe?id=${hobbyID}`)
        .then(res => {
            dispatch(getHobbies());
        });
};
