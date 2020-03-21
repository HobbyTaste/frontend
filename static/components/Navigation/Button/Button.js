import React, {Component} from 'react';
import style from './Button.css'
import {Link} from 'react-router-dom';

const Button = (props) => {
    return (
        <div className={style.dropdown}>
           <button className={style.dropBtn}>Каталог</button>
            <div className={style.dropdownContent}>
                <a href="/">Subtitle 1</a>
                <a href="/">Subtitle 1</a>
                <a href="/">Subtitle 1</a>
                <a href="/">Subtitle 1</a>
            </div>
        </div>
    );
};

export default Button;
