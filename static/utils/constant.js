export const categories = [{
    label: 'Творчество',
    url: 'creativity'
},
    {
        label: 'Рисование',
        url: 'art'
    }, {
        label: 'Музыка',
        url: 'music'
    }, {
        label: 'Спорт',
        url: 'sport'
    }, {
        label: 'Игровые виды спорта',
        url: 'sport_game'
    },
    {   label: 'Борьба и единоборства',
        url: 'sport_wrestling'
    }, {
        label: 'Зимние виды спорта',
        url: 'sport_winter'
    }, {
        label: 'Водные виды спорта',
        url: 'sport_water'
    },
    {
        label: 'Танцы',
        url: 'dance'
    }, {
        label: 'Другое',
        url: 'other'
    }];

export const defaultAvatarUrl = 'https://images.assetsdelivery.com/compings_v2/jenjawin/jenjawin1904/jenjawin190400208.jpg';
export const defaultHobbyProps = {
    imageUrl: 'https://kravmaganewcastle.com.au/wp-content/uploads/2017/04/default-image-800x600.jpg',
    price: 500,
    priceTIme: "за занятие",
    priceCurriculum: "по будням"
};

export const comments = [
    {
        text: "Всё классно! Обязательно приду ещё)",
        datetime: "03.05.2020",
        evaluation: 5
    },
    {
        text: "Это было ужасно... Ничего не работает( Остался крайне разочарован, никому не советую. Заодно проверяю, что при большом количестве текста комментарий отображается нормально.",
        datetime: "03.05.2020",
        evaluation: 1
    }
]

export const HTTP_STATUS = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    OK: 200,
}