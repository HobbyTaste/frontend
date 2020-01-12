import React, {Component} from 'react';
import s from './Header.module.css';
import Logo from "./Logo/Logo";
import LoginUser from "./LoginUser/LoginUser";
import LogoutUser from "./LogoutUser/LogoutUser";
import {Link} from 'react-router-dom';

const Header = (props) => {
    let toMainCategories = () => {
        props.setSubmit(false);
    };
    return (
        <header className={s.header}>
            <div className={s.logoContainer} onClick={toMainCategories}>
                <Link to='/' style={{ textDecoration: 'none' }}>
                <Logo />
                </Link>
            </div>
            { props.isAuth
                ? <div className={s.tmp}><LogoutUser logout={props.logout} avatar={props.avatar}/></div>
                : <div className={s.tmp}><LoginUser/></div> }
        </header>);
};

export default Header;