import React, {Component} from 'react';
import style from './Navigation.css';
import Button from  './Button/Button';
import {Link} from 'react-router-dom';
import LinkCategory from './LinkCategory'

const Navigation = (props) => {
    return (
        <nav className={style.navSite}>
            <Button/>
            <ul className={style.menu}>
                <li><LinkCategory label='Рисование ' url='art'/></li>
                <li><LinkCategory label='Музыка' url='music'/></li>
                <li><LinkCategory label='Спорт' url='sport'/></li>
                <li><LinkCategory label='Единоборства' url='sport_wrestling'/></li>
                <li><LinkCategory label='Танцы' url='dance'/></li>
                <li><LinkCategory label='Другое' url='other'/></li>
            </ul>
        </nav>

    );
};

export default Navigation;
