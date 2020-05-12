import is from 'is_js';
export const required = (value) => {
    if(value) {
        return undefined;
    }
    return "Обязательное поле!";
};
export const email = (value) => {
    if (!is.email(value)) {
        return `${value} Некорректный email`;
    }
};

export const minLengthCreator = (minLength) => (value) => {
    if (value.length < minLength) {
        return `Пароль должен содержать ${minLength} символов`;
    }
};
