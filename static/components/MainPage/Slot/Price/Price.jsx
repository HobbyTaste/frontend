import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import style from './Price.module.css';

const Price = (props) => {
    return (<span className={style.priceContainer}>
        <div className={style.centringContainer}>
            { !(props.price)
                ? <div className={style.price}>Не указана</div>
                : <div className={style.price}>{props.price}</div> }
        </div>
        <div className={style.centringContainer}>
            { !(props.price)
                ? <div className={style.priceTime}>уточняйте</div>
                : <div className={style.priceTime}>{props.priceTime}</div> }
        </div>
        <div className={style.centringContainer}>
            { (props.priceCurriculum) && <div className={style.priceDays}>{props.priceCurriculum}</div> }
        </div>
    </span>);
}

export default Price;
