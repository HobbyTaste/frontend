import * as actionTypes from '../actions/actionsTypes';


let initialState = {
    initializedPage: false,
    id: 1,
    label: 'Вид хобби',
    metro: 'станция метро',
    timeTable: 'расписание',
    equipment: '',
    address: 'Город улица дом всё такое',
    comfortable: '',
    specialConditions: '',
    description: 'Какое-то описание',
    price: 'цена',
    flag: {
        isParking: false,
        isBeginner: false,
        isRent: false,
    },
    contact: {
        mobile: '',
        website: '',
    },
    category: '',
    /*комменарии и ответы изначально пустые, это для примера*/
    comments: [{
        idComment: 1,
        userId: 1,
        text: 'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
        nameWriter: 'Азалия',
        date: '28.12.2020',
        stars: 5,
        answer: {
            providerId: 1,
            text: 'Спасибо за ваш отзыв! ',
            nameWriter: 'Имя парнера',
            date: '15.04.2020',
        }
    },
        {
            idComment: 2,
            userId: 2,
            text:'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
            nameWriter: 'Имя',
            date: '28.12.2020',
            stars: 5,
            answer: null,
        },
        {
            idComment: 3,
            userId: 2,
            text:'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
            nameWriter: 'Имя',
            date: '28.12.2020',
            stars: 5,
            answer: { providerId: 2,
                text: 'Спасибо за ваш отзыв! бла бла бла',
                nameWriter: 'Имя парнера2',
                date: '16.04.2020'
            }
        }],
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

    case actionTypes.EDIT_PAGE:
        return {
            ...state,
            label: action.label,
            metro: action.metro,
            timeTable: action.timeTable,
            equipment: action.equipment,
            address: action.address,
            comfortable: action.comfortable,
            specialConditions: action.specialConditions,
            description: action.description,
            price: action.price,
            flag: action.flag,
            contact: action.contact,
            category: action.category,
        };
    default:
        return state;
    }
};


export default hobbyPageReducer;


