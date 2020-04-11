import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import style from './Tag.module.css';

const Tag = (props) => {
    return (<span className={style.tagContainer}>
        {props.isParking && <div className={`${style.tag} ${style.tagParking}`}>рядом парковка</div>}
        {props.isBeginner && <div className={`${style.tag} ${style.tagBeginner}`}>для новичков</div>}
        {props.isRent && <div className={`${style.tag} ${style.tagRent}`}>экипировка</div>}
    </span>);
}

export default Tag;
