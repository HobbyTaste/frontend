import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
/* времено, чтобы передалвался массив комментариев */
const comments = [{
    idComment: 1,
    userId: 1,
    text: 'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
    nameWriter: 'Азалия',
    date: '28.12.2020',
    stars: 2,
    answer: {
        providerId: 1,
        text: 'Спасибо за ваш отзыв! ',
        nameWriter: 'Имя парнера',
        date: '15.04.2020',
    },
},
{
    idComment: 2,
    userId: 2,
    text: 'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
    nameWriter: 'Имя',
    date: '28.12.2020',
    stars: 3,
    answer: null,
},
{
    idComment: 3,
    userId: 2,
    text: 'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
    nameWriter: 'Имя',
    date: '28.12.2020',
    stars: 5,
    answer: {
        providerId: 2,
        text: 'Спасибо за ваш отзыв! бла бла бла',
        nameWriter: 'Имя парнера2',
        date: '16.04.2020',
    },
}];

const imageMissing = 'https://kravmaganewcastle.com.au/wp-content/uploads/2017/04/default-image-800x600.jpg';

const
    Slot = (props) => (<div className={style.slot}>
        {props.pic ? <img className={style.slotPic} src={props.pic}/> : <img className={style.slotPic} src={imageMissing}/>}
        <span className={style.slotDescription}>
            <div className={style.slotHeader}>
                <Link to={`/hobby/card/${props.id}`} className={`${style.name} ${style.colorBlackSlot}`}>{props.name}</Link>
                <HalfRating answersArray={comments}/>
            </div>
            <div className={`${style.metro} ${style.colorBlueSlot}`}>
                <LocationOnIcon style={{ color: '#034488', fontSize: 'small' }} /> {props.metro}
            </div>
            <div className={`${style.address} ${style.colorGraySlot}`}>{props.adress}</div>
        </span>
        {props.isOwn
            ? <Monetization Widget={props.Widget} Top={props.Top} Poster={props.Poster}/>
            : <span className={style.addInfoContainer}>
                <Tag isParking={props.isParking} isBeginner={props.isBeginner} isRent={props.isRent}/>
                <Price price={props.price} priceTime={props.priceTime} priceCurriculum={props.priceCurriculum}/>
            </span>}
        {props.isUserAuth
            ? (props.isProviderAuth
                ? (props.isOwn
                    ? <div className={style.icon}>
                        <Link to='/provider/cabinet/edit_hobby'><EditIcon style={{ color: 'black' }}/></Link>
                    </div>
                    : <div className={style.icon}><MonetizationOnIcon/></div>)
                : <div className={style.icon}><BookmarkBorderIcon/></div>)
            : <div className={style.iconEmpty}/>}
        <Link to='/hobby/card' className={style.icon}><MoreHorizIcon/></Link>
    </div>);

export default Slot;
