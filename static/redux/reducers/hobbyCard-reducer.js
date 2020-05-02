import * as actionTypes from '../actions/actionsTypes';
import photo from '../../components/HobbyCard/Image/photo.png';
let initialState = {
    initializedPage: false,
    id: 1,
    photos: [],
    label: '',
    metro: '',
    timeTable: '',
    equipment: '',
    facilities: '',
    special: '',
    monetization: '',
    address: '',
    comfortable: '',
    specialConditions: '',
    description: '',
    price: 'Уточняйте',
    flag: {
        isParking: false,
        isBeginner: false,
        isRent: false,
        isChild: false,
    },
    contact: {
        mobile: '',
        website: '',
        email: '',
    },
    category: '',
};
const hobbyPageReducer = (state = initialState, action) => {
        switch (action.type) {
        case actionTypes.INITIALIZE_HOBBY_PAGE:
            return {
                ...state,
                initializedPage: action.initialized,
            };
        case actionTypes.ADD_RESPONSE:
            return {
                ...state,
                comments: [
                    ...state.comments, action.comment
                ]
            };
        case actionTypes.SET_HOBBY_DATA:
            return {
                ...state,
                label: action.payload.label,
                metro: action.payload.metroStation,
                metroId: action.payload.metroId,
                email: action.payload.email,
                address: action.payload.address,
                specialConditions: action.payload.specialConditions,
                description: action.payload.description,
                shortDescription: action.payload.shortDescription,
                price: action.payload.price,
                facilities: action.payload.facilities,
                special: action.payload.special,
                timeTable: action.payload.workTime,
                monetization: action.payload.monetization,
                owner: action.payload.owner,
                flag: {
                    isParking: action.payload.parking,
                    isBeginner: action.payload.novice,
                    isRent: action.payload.equipment,
                    isChild: action.payload.children,
                },
                subscribers: action.payload.subscribers,
                contact: {
                    mobile: action.payload.phone,
                    email: action.payload.email,
                },
                category: action.payload.category,
                comments: action.payload.comments,
            };
        default:
            return state;
        }
        ;
    }
;


export default hobbyPageReducer;


