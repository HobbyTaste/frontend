import React, {Component} from 'react';
import style from './Button.css'
import {Link} from 'react-router-dom';

const Button = (props) => {
    return (
        <div className={style.dropdown}>
           <button className={style.dropBtn}>Каталог</button>
            <ul className={style.dropdownContent}>
                <li><a href="/">Subtitle 1</a></li>
                <li><a href="/">Subtitle 1</a></li>
                <li><a href="/">Subtitle 1</a></li>
                <li><a href="/">Subtitle 1</a></li>
                <li><a href="/">Subtitle 1</a></li>
            </ul>
        </div>
    );
};

export default Button;
