import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import style from './Price.module.css';

class Price extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    render() {
        return (<span className={style.priceContainer}>
            <div className={style.price}>{this.props.price}</div>
            <div className={style.priceTime}>{this.props.priceTime}</div>
            <div className={style.priceDays}>{this.props.priceCurriculum}</div>
        </span>);
    }
}

export default Price;
