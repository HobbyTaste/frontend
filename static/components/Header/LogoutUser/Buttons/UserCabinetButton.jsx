import React, {Component} from 'react';
import s from './../../HeaderButtons.module.css';
import {Link} from "react-router-dom";

const UserCabinetButton = (props) => {
    return (<div>
            <Link to='/user/cabinet'>
                <button className={s.headerButtons}>ЛИЧНЫЙ КАБИНЕТ</button>
            </Link>
        </div>
    );
};

export default UserCabinetButton;