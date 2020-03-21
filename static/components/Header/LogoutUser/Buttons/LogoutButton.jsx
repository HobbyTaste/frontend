import React, {Component} from 'react';
import s from './../../HeaderButtons.module.css';
import style from '../../Header.module.css'
import {Link} from "react-router-dom";

const LogoutButton = (props) => {
    return (
            <div className={style.nameContainer}>
                <button className={s.headerButtons}>
                    {props.name}
                </button>
            </div>
    );
};

export default LogoutButton;
