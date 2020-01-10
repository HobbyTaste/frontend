const ADD_NEW_HOBBY = 'ADD_NEW_HOBBY';
const TOGGLE_IS_ADDING_PROGRESS = 'TOGGLE_IS_ADDING_PROGRESS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_HOBBIES = 'SET_HOBBIES';

let initialState = {
    userHobbies: [],
    addingInProgress: [],
    isFetching: false
};

const UserCabinetReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            };
        case TOGGLE_IS_ADDING_PROGRESS:
            return {
                ...state,
                addingInProgress: action.isFetching ? [...state.addingInProgress, action.hobbyId]
                    : state.addingInProgress.filter(id => id !== action.hobbyId)

            };
        case SET_HOBBIES:
            return {
                ...state, userHobbies: action.userHobbies
            };
        default:
            return state;
    }
};

const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
const toggleAddingProgress = (isFetching, hobbyId) => ({type: TOGGLE_IS_ADDING_PROGRESS, isFetching, hobbyId});
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

export const addNewHobby = (isFetching, hobbyID) => (dispatch) => {
    dispatch(toggleAddingProgress(true, hobbyID));
    userApi.addHobby(hobbyID)
        .then((response) => {
            if(response.ok) {
                dispatch()
            }
            dispatch(toggleAddingProgress(false, hobbyID));
        });
};
export default UserCabinetReducer;