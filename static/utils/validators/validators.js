import validator from 'react-validation';

export const required = (value) => {
    if(value) {
        return undefined;
    }
    return "Обязательное поле!";
};
