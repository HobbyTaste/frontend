import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import style from './Tag.module.css';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

const Tag = (props) => {
    return (<span className={style.tagContainer}>
        {props.isParking && <div className={`${style.tag} ${style.tagParking}`}>
            рядом парковка
            <span className={style.icon}><DoneOutlineIcon style={{ fontSize: 'small' }}/></span>
        </div>}
        {props.isBeginner && <div className={`${style.tag} ${style.tagBeginner}`}>
            для новичков
            <span className={style.icon}><DoneOutlineIcon style={{ fontSize: 'small' }}/></span>
        </div>}
        {props.isRent && <div className={`${style.tag} ${style.tagRent}`}>
            экипировка
            <span className={style.icon}><DoneOutlineIcon style={{ fontSize: 'small' }}/></span>
        </div>}
    </span>);
}

export default Tag;
