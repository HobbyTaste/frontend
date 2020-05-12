import React from 'react';
import {AnimatedModalWindow} from '../../../HOC/AnimatedModalWindow/AnimatedModalWindow';
import SignForm from './SignForm/SignForm';
const LoginUserWindow =(props) => {

    let Sign = AnimatedModalWindow(SignForm, "Вход", '', true);
    return (
        <Sign />
    );
}
export default LoginUserWindow;
