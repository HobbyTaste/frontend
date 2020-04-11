import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import style from './Card.module.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HalfRating from '../../HobbyCard/InformationForm/FeedbackStatistic';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    render() {
        return (<div>
            <span className={style.card}>
                <span className={style.cardDescription}>
                    <div className={style.cardHeader}>
                        <span className={`${style.name} ${style.colorWhiteCard}`}>{this.props.name}</span>
                    </div>
                    <div className={`${style.metro} ${style.colorBlueCard}`}>
                        {this.props.metro}
                    </div>
                    <div className={`${style.address} ${style.colorGrayCard}`}>{this.props.adress}</div>
                </span>
            </span>
        </div>);
    }
}

export default Card;
