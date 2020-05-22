import React, { Component } from 'react';
import style from './Header.module.css';
import Logo from './Logo/Logo';
import LogoutUser from './LogoutUser/LogoutUser';
import { Link } from 'react-router-dom';
import FilteredList from './Search/FilerList/FilterList';
import LoginUserWindow from './LoginUser/LoginUserWindow';

const Header = (props) => {
    let isAuth = false;
    let logoutF = props.logout;
    if (props.isProviderAuth) {
        logoutF = props.logoutProvider;
        isAuth = true;
    }
    if (props.isUserAuth) {
        isAuth = true;
    }
    return (
        <header className={style.header}>
            <div className={style.logoContainer}>
                <Link to='/'>
                    <Logo setIsUserInCabinet={props.setIsUserInCabinet}/>
                </Link>
            </div>
            <div className={style.searchContainer}>
                <FilteredList/>
            </div>
            {isAuth
                ? <div className={style.buttonContainer}><LogoutUser logout={logoutF} name={props.name}/></div>
                : <div className={style.buttonContainer}><LoginUserWindow/></div>}

        </header>);
};

export default Header;
