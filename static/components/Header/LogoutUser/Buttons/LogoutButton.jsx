import React, {Component} from 'react';
import s from './../../HeaderButtons.module.css';
import {Link} from "react-router-dom";

const LogoutButton = (props) => {
    return (
            <div>
                <button onClick={props.logout} className={s.headerButtons}>
                    ВЫЙТИ
                </button>
            </div>
    );
};

export default LogoutButton;