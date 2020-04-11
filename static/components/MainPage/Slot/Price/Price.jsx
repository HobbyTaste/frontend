import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import style from './Price.module.css';

const Price = (props) => {
    return (<span className={style.priceContainer}>
        <div className={style.price}>{props.price}</div>
        <div className={style.priceTime}>{props.priceTime}</div>
        <div className={style.priceDays}>{props.priceCurriculum}</div>
    </span>);
}

export default Price;
