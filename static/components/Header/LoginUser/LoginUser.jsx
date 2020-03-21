import React, {Component} from 'react';
import s from './../Header.module.css';
import {withModalWindow} from "../../../HOC/ModalWindow/ModalWindow";
import Login from "./SignIn/SignIn";
import Registration from "../../Registration/Registration";
import {AnimatedModalWindow} from "../../../HOC/AnimatedModalWindow/AnimatedModalWindow";

const LoginUser = (props) => {
    let SignIn = AnimatedModalWindow(Login, "Вход", '', true);
    return (<div className={s.buttonsContainer}>
            <SignIn buttonName={"ВОЙТИ"}/>
        </div>
    );
};

export default LoginUser;
