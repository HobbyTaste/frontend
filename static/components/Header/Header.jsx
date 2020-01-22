import React, {Component} from 'react';
import style from './Header.module.css';
import Logo from "./Logo/Logo";
import LoginUser from "./LoginUser/LoginUser";
import LogoutUser from "./LogoutUser/LogoutUser";
import {Link} from 'react-router-dom';

const Header = (props) => {
    return (
        <header className={style.header}>
            <div className={style.logoContainer}>
                <Link to='/'>
                <Logo />
                </Link>
            </div>
            { props.isAuth
                ? <div className={style.buttonContainer}><LogoutUser logout={props.logout} avatar={props.avatar}/></div>
                : <div className={style.buttonContainer}><LoginUser/></div> }
        </header>);
};

export default Header;