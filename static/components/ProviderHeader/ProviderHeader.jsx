import React, {Component} from 'react';
import s from '../Header/Header.module.css';
import Logo from "../Header/Logo/Logo";
import {Link} from "react-router-dom";
import {logoutProvider} from "../../redux/reducers/provider-reducer";

const ProviderHeader = (props) => {
    return (
        <header className={s.header}>
            <div className={s.logoContainer}>
                    <Logo />
            </div>
            <div className={s.tmp}>
                <button onClick={props.logoutProvider}>ВЫХОД</button>
            </div>
        </header>);
};

export default ProviderHeader;