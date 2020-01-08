import React, {Component} from 'react';
import s from './../../HeaderButtons.module.css';
import {Link} from "react-router-dom";

const LogoutButton = (props) => {
    return (
        /*<Link to='/'>*/
            <div>
                <button onClick={props.logout} className={s.headerButtons}>
                    ВЫЙТИ
                </button>
            </div>
        /*</Link>*/
    );
};

export default LogoutButton;