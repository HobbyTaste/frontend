import Hobby from '../../api/Hobby';
import { setIsUserInCabinet } from './auth-reducer';


const INITIALIZE_PAGE = 'INITIALIZE_PAGE';
const ADD_ANSWER = 'ADD_ANSWER';
const ADD_FEEDBACK = 'ADD_FEEDBACK';
const EDIT_PAGE = 'EDIT_PAGE';

const hobbyApi = new Hobby();

let initialState = {
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
    comments: [{
        idComment: 1,
        userId: 1,
        isHaveAnswer: true,
        text: 'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
        nameWriter: 'Азалия',
        date: '28.12.2020',
        stars: 5,
        answerId:1,
    },
        {
            idComment: 2,
            userId: 2,
            isHaveAnswer: false,
            text:'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
            nameWriter: 'Имя',
            date: '28.12.2020',
            stars: 5,
            answerId: null,
        },
    ],
    answers: [{
        answer_id: 1,
        providerId: 1,
        text: 'Спасибо за ваш отзыв! бла бла бла',
        nameWriter: 'Имя парнера',
        status: 'директор',
        idComment: 1,
        date: '15.04.2020',
    },
        {
            answerId:2,
            providerId: 2,
            text: 'Спасибо за ваш отзыв! бла бла бла',
            nameWriter: 'Имя парнера2',
            status: 'руководитель',
            idComment: 3,
            date: '16.04.2020',
        }
    ],
    initializedPage: false,
};

const hobbyPageReducer = (state = initialState, action) => {
    switch (action.type) {
    case INITIALIZE_PAGE:
        return {
            ...state,
            initializedPage: action.initialized,
        };
    case ADD_ANSWER:
        return {
            ...state,
            answers: [
                ...state.answers, action.answer
            ]
        };
    case ADD_FEEDBACK:
        return {
            ...state,
            comments: [
                ...state.comments,
                action.comment,
            ],
        };
    case EDIT_PAGE:
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

const initializedPageSuccess = (initialized) => ({
    type: INITIALIZE_PAGE,
    initialized
});
const addFeedback = comment => ({
    type: ADD_FEEDBACK,
    comment
});
const addAnswer = answer => ({
    type: ADD_ANSWER,
    answer
});
const editPage = (a_label, a_metro, a_timeTable, a_equipment, a_address, a_comfortable, a_description, a_specialConditions, a_price, a_flag, a_contact, a_category) => ({
    type: EDIT_PAGE,
    label: a_label,
    metro: a_metro,
    timeTable: a_timeTable,
    equipment: a_equipment,
    address: a_address,
    comfortable: a_comfortable,
    specialConditions: a_specialConditions,
    description: a_description,
    price: a_price,
    flag: a_flag,
    contact: a_contact,
    category: a_category,
});

export default hobbyPageReducer;


