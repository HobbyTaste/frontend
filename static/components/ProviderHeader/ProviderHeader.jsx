import React, {Component} from 'react';
import s from '../Header/Header.module.css';
import Logo from "../Header/Logo/Logo";
import LogoutButton from "../Header/LogoutUser/Buttons/LogoutButton";

const ProviderHeader = (props) => {
    return (
        <header className={s.header}>
            <div className={s.logoContainer}>
                <Logo/>
            </div>
            <div className={s.tmp}>
                <LogoutButton logout={props.logoutProvider}/>
            </div>
        </header>);
};

export default ProviderHeader;