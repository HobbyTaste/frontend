import React from 'react';
import Login from './SignIn/SignIn';
import Registration from '../../Registration/Registration';
import {AnimatedModalWindow} from '../../../HOC/AnimatedModalWindow/AnimatedModalWindow';
import s from './../Header.module.css'


const LoginUserWindow =(props) => {
    let SignIn = AnimatedModalWindow(Login, "ВХОД", '', true);
    let SignUp = AnimatedModalWindow(Registration, "РЕГИСТРАЦИЯ", '', true);
    return (<div className={s.buttonContainer}>
        <SignUp buttonName={"Регистрация"}/>
        <SignIn buttonName={"ВОЙТИ"}/>
    </div>);
}
export default LoginUserWindow;
