import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import style from './Card.module.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HalfRating from '../../HobbyCard/InformationForm/FeedbackStatistic';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const Card = (props) => (<div>
    <span className={style.card}>
        <span className={style.cardDescription}>
            <div className={style.cardHeader}>
                <span className={`${style.name} ${style.colorWhiteCard}`}>{props.name}</span>
                <HalfRating isUserAuth = {props.isUserAuth}/>
            </div>
            <span className={style.icon}><MoreHorizIcon style={{ color: '#FFFFFF' }}/></span>
            <div className={`${style.metro} ${style.colorBlueCard}`}>
                <LocationOnIcon style={{ color: '#178FD6', fontSize: 'small' }} /> {props.metro}
            </div>
            <div className={`${style.address} ${style.colorGrayCard}`}>{props.address}</div>
            {props.isUserAuth
                ? (props.isProviderAuth ? <span className={style.icon}><MonetizationOnIcon style={{ color: '#FFFFFF', fontSize: 'small' }}/></span>
                    : <span className={style.icon}><BookmarkBorderIcon style={{ color: '#FFFFFF' }}/></span>)
                : <span className={style.iconEmpty}/>}
        </span>
    </span>
</div>)
export default Card;
