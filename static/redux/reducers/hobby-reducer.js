import Hobby from "../../api/Provider";

const GET_HOBBIES = 'ADD_NEW_HOBBY';

const hobbyApi = new Hobby();

let initialState = {
    label: '',     // название
    phone: '',    // номер телефона
    email: '',    // контактный email
    address: '',   // точный адрес
    metroStation: '',  // название станции метро ближайшей
    metroId: '',   // id-шник станции метро
    description: '',  // полное описание хобби
    shortDescription: '',   // краткое описание
    owner: '',         // id-шник партнера, кто создал хобби
    avatar: '',
    listOfAllHobbies: []
};

const HobbiesReducer = (state = initialState, action) => {
    switch (action.type) {

        default:
            return state;
    }
};


export default HobbiesReducer;