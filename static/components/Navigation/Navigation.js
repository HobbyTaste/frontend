import React, {Component} from 'react';
import style from './Navigation.css';
import Button from  './Button/Button';
import {Link} from 'react-router-dom';

const Navigation = (props) => {
    return (
        <nav className={style.navSite}>
            <Button/>
            <ul className={style.menu}>
                <li><a href="/search/art">РИСОВАНИЕ</a></li>
                <li><a href="/search/music">МУЗЫКА</a></li>
                <li><a href="/search/sport">СПОРТ</a></li>
                <li><a href="/search/sport_wrestling">ЕДИНОБОРСТВА</a></li>
                <li><a href="/search/dance">ТАНЦЫ</a></li>
                <li><a href="/search/other">ДРУГОЕ</a></li>
            </ul>
        </nav>

    );
};

export default Navigation;
