import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import style from './Tag.module.css';

class Tag extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    render() {
        return (<span className={style.tagContainer}>
            {this.props.isParking && <div className={`${style.tag} ${style.tagParking}`}>рядом парковка</div>}
            {this.props.isBeginner && <div className={`${style.tag} ${style.tagBeginner}`}>для новичков</div>}
            {this.props.isRent && <div className={`${style.tag} ${style.tagRent}`}>экипировка</div>}
        </span>);
    }
}

export default Tag;
