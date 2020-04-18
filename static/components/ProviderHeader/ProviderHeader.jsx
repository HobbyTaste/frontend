import React, {Component} from 'react';
import style from '../Header/Header.module.css';
import Logo from "../Header/Logo/Logo";
import LogoutButton from "../Header/LogoutUser/Buttons/UserMenu";
import Avatar from "../Header/LogoutUser/Avatar/Avatar";

const ProviderHeader = (props) => {
    return (
        <header className={style.header}>
            <div className={style.logoContainer}>
                <Logo/>
            </div>
            <div className={style.buttonContainer}>
                <Avatar avatar={props.avatar} />
                <LogoutButton logout={props.logoutProvider}/>
            </div>
        </header>);
};

export default ProviderHeader;
