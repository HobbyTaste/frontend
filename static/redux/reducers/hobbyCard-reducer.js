import * as actionTypes from '../actions/actionsTypes';
let initialState = {
    initializedPage: false,
    id: '',
    commentsId: [],
    comments: [],
    photos: [],
    avatar: '',
    imageUrl: '',
    owner: '',
    label: '',
    metro: '',
    timeTable: '',
    facilities: '',
    special: '',
    monetization: '',
    address: '',
    location: '',
    providerSubscribers: '',
    subscribers : '',
    description: '',
    price: 'Уточняйте',
    flag: {
        isParking: false,
        isBeginner: false,
        isRent: false,
        isChild: false,
    },
    contacts: {
        mobile: '',
        website: '',
        email: '',
        instagram: '',
        vk: '',
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
        case actionTypes.SET_HOBBY_COMMENTS:
            return {
                ...state,
                comments: action.comments
            };
        case actionTypes.SET_HOBBY_DATA:
            return {
                ...state,
                id: action.payload._id,
                label: action.payload.label,
                metro: action.payload.metroStation,
                metroId: action.payload.metroId,
                address: action.payload.address,
                location: action.payload.location,
                description: action.payload.description,
                shortDescription: action.payload.shortDescription,
                price: action.payload.price,
                facilities: action.payload.facilities,
                special: action.payload.special,
                timeTable: action.payload.workTime,
                monetization: action.payload.monetization,
                owner: action.payload.owner,
                imageUrl: action.payload.imageUrl,
                avatar: action.payload.avatar,
                flag: {
                    isParking: action.payload.parking,
                    isBeginner: action.payload.novice,
                    isRent: action.payload.equipment,
                    isChild: action.payload.children,
                },
                subscribers: action.payload.subscribers,
                providerSubscribers: action.payload.providerSubscribers,
                contacts: {
                    mobile: action.payload.phone,
                    email: action.payload.email,
                    vk: action.payload.contacts.vk,
                    instagram: action.payload.contacts.instagram,
                    website: action.payload.website,
                },
                category: action.payload.category,
                commentsId: action.payload.comments,
            };
        default:
            return state;
        }
        ;
    }
;


export default hobbyPageReducer;


