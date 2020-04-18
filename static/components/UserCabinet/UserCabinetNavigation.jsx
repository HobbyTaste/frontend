import React, {Component} from 'react';
import style from './UserCabinet.module.css';
import Button from  '../Navigation/Button/Button';
import {Link} from 'react-router-dom';

const UserCabinetNavigation = (props) => {
    return (
        <nav className={style.navigation}>
            <Button/>
            <ul className={style.menu}>
                <li className={style.menuPoint} href="/user/cabinet">ПРОФИЛЬ</li>
                <li className={style.menuPoint} href="/user/cabinet/hobbies">МОИ ХОББИ</li>
            </ul>
        </nav>

    );
};

export default UserCabinetNavigation;
