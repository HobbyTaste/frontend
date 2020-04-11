import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import style from './Card.module.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HalfRating from '../../HobbyCard/InformationForm/FeedbackStatistic';

const Card = (props) => {
    return (<div>
        <span className={style.card}>
            <span className={style.cardDescription}>
                <div className={style.cardHeader}>
                    <span className={`${style.name} ${style.colorWhiteCard}`}>{props.name}</span>
                    <HalfRating isUserAuth = {props.isUserAuth}/>
                </div>
                <div className={`${style.metro} ${style.colorBlueCard}`}>
                    <LocationOnIcon style={{ color: '#178FD6', fontSize: 'small' }} /> {props.metro}
                </div>
                <div className={`${style.address} ${style.colorGrayCard}`}>{props.address}</div>
            </span>
        </span>
    </div>);
}
export default Card;
