import React, {Component} from 'react';
import style from './Navigation.css';
import Button from  './Button/Button'
import {Link} from 'react-router-dom';

const Navigation = (props) => {
    return (
        <nav className={style.navSite}>
            <Button/>
            <ul className={style.menu}>
                <li><a href="/">ITEM ONE</a></li>
                <li><a href="/">ITEM TWO</a></li>
                <li><a href="/">ITEM THREE</a></li>
                <li><a href="/">ITEM FOUR</a></li>
                <li><a href="/">ITEM FIVE</a></li>
                <li><a href="/">ITEM SIX</a></li>
            </ul>
        </nav>

    );
};

export default Navigation;
