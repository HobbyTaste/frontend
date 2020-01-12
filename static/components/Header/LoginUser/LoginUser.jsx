import React, {Component} from 'react';
import s from './../Header.module.css';
import {withModalWindow} from "../../../HOC/ModalWindow/ModalWindow";
import Login from "./SignIn/SignIn";
import Registration from "../../Registration/Registration";
import {AnimatedModalWindow} from "../../../HOC/AnimatedModalWindow/AnimatedModalWindow";

const LoginUser = (props) => {
    let SignIn = AnimatedModalWindow(Login, "ВХОД", '', true);
    let SignUp = AnimatedModalWindow(Registration, "РЕГИСТРАЦИЯ", '', true);
    return (<div className={s.buttonsContainer}>
            <SignUp buttonName={"РЕГИСТРАЦИЯ"}/>
            <SignIn buttonName={"ВОЙТИ"}/>
        </div>
    );
};

export default LoginUser;