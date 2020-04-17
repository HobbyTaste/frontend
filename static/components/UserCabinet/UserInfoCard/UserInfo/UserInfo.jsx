import React, { Component } from 'react';
import style from './UserInfo.module.css';
import { AnimatedModalWindow } from '../../../../HOC/AnimatedModalWindow/AnimatedModalWindow';
import ChangeForm from './ChangeUserInfoForm/ChangeUserInfoForm';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EditIcon from '@material-ui/icons/Edit';

const UserInfo = (props) => {
    const Edit = AnimatedModalWindow(ChangeForm, 'Редактировать');
    return (
        <div className={style.infoContainer}>
            <div className={style.name}>{props.name}</div>
            <div className={style.metro}>
                <LocationOnIcon style={{ color: '##178FD6' }} /> {props.metro}
            </div>
            <button className={style.buttonChange}>
                Редактировать<EditIcon className={style.iconEdit}/>
            </button>
        </div>
    );
};

export default UserInfo;
