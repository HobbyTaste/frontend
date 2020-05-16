import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import EditIcon from '@material-ui/icons/Edit';
import Monetization from './Price/Monetization';
import Tag from './Tags/Tag';
import Price from './Price/Price';
import HalfRating from '../../Common/FeedbackStatistic';
import style from './Slot.module.css';
import { isInArray } from '../../../utils/functions';

const imageMissing = 'https://kravmaganewcastle.com.au/wp-content/uploads/2017/04/default-image-800x600.jpg';

const Slot = (props) =>{
        return (<div className={style.slot}>
            <div className={style.leftContainer}>
            {props.pic ? <img className={style.slotPic} src={props.pic}/> :
                <img className={style.slotPic} src={imageMissing}/>}
            <span className={style.slotDescription}>
            <div className={style.slotHeader}>
                <Link to={`/hobby/card/${props.id}`}
                      className={`${style.name} ${style.colorBlackSlot}`}>{props.name}</Link>
                <HalfRating rating={props.rating}/>
            </div>
            <div className={`${style.metro} ${style.colorBlueSlot}`}>
                <LocationOnIcon style={{
                    color: '#034488',
                    fontSize: 'small'
                }}/> {props.metro}
            </div>
            <div className={`${style.address} ${style.colorGraySlot}`}>{props.adress}</div>
        </span>
            </div>
            <span className={style.rightContainer}>
            {props.isOwn
                ? <Monetization Widget={props.Widget} Top={props.Top} Poster={props.Poster}/>
                : <span className={style.addInfoContainer}>
                <Tag isParking={props.isParking} isBeginner={props.isBeginner} isRent={props.isRent}
                     isChild={props.isChild}/>
                <Price price={props.price} priceTime={props.priceTime} priceCurriculum={props.priceCurriculum}/>
            </span>}
            { (props.isProviderAuth || props.isUserAuth) ? (props.isOwner ? (props.isOwn ?
                <div className={style.icon}>
                    <Link to='/provider/cabinet/edit_hobby'><EditIcon style={{ color: 'black' }}/></Link>
                </div>
                : <Link to="/provider/cabinet" style={{
                    color: 'black',
                    display: 'flex',
                    top: '50%'
                }}>
                    <div className={style.icon}><MonetizationOnIcon/></div>
                </Link>)
                : (isInArray(props.idUser, props.subscribers) ? <button className={style.buttonContainer} onClick={(e) => props.onClick(e, props.id)}>
                        <div className={style.icon}><BookmarkIcon/></div>
                    </button> :
                    <button className={style.buttonContainer} onClick={(e) => props.onClick(e, props.id)}>
                        <div className={style.icon}><BookmarkBorderIcon/></div>
                    </button>)
            ): <div className={style.iconEmpty}/>}
            <Link to={`/hobby/card/${props.id}`} className={style.icon}><MoreHorizIcon/></Link>
            </span>
        </div>);
}


export default (withRouter)(Slot);
