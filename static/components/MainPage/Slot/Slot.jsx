import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import style from './Slot.module.css';
import HalfRating from '../../HobbyCard/InformationForm/FeedbackStatistic';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Price from './Price/Price';
import Tag from './Tags/Tag';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

const Slot = (props) => {
    return (<div className={style.slot}>
        <span className={style.slotPic}/>
        <span className={style.slotDescription}>
            <div className={style.slotHeader}>
                <span className={`${style.name} ${style.colorBlackSlot}`}>{props.name}</span>
                <HalfRating isUserAuth = {props.isUserAuth}/>
            </div>
            <div className={`${style.metro} ${style.colorBlueSlot}`}>
                <LocationOnIcon style={{ color: '#034488', fontSize: 'small' }} /> {props.metro}
            </div>
            <div className={`${style.address} ${style.colorGraySlot}`}>{props.adress}</div>
        </span>
        <Tag isParking={props.isParking} isBeginner={props.isBeginner} isRent={props.isRent}/>
        <Price price={props.price} priceTime={props.priceTime} priceCurriculum={props.priceCurriculum}/>
        {props.isUserAuth
            ? (props.isProviderAuth ? <div className={style.icon}><MonetizationOnIcon/></div>
                : <div className={style.icon}><BookmarkBorderIcon/></div>)
            : <div className={style.iconEmpty}/>}
        <div className={style.icon}><MoreHorizIcon/></div>
    </div>);
}

export default Slot;
