import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import style from './Slot.module.css';
import HalfRating from '../../Common/FeedbackStatistic';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Price from './Price/Price';
import Tag from './Tags/Tag';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { isInArray } from '../../../utils/functions';
import Button from '@material-ui/core/Button';
/*времено, чтобы передалвался массив комментариев*/
const comments =  [{
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
    }
},
    {
        idComment: 2,
        userId: 2,
        text:'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
        nameWriter: 'Имя',
        date: '28.12.2020',
        stars: 3,
        answer: null,
    },
    {
        idComment: 3,
        userId: 2,
        text:'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
        nameWriter: 'Имя',
        date: '28.12.2020',
        stars: 5,
        answer: { providerId: 2,
            text: 'Спасибо за ваш отзыв! бла бла бла',
            nameWriter: 'Имя парнера2',
            date: '16.04.2020'
        }
    }]

const imageMissing='https://kravmaganewcastle.com.au/wp-content/uploads/2017/04/default-image-800x600.jpg';

const
    Slot = (props) => {
    return (<div className={style.slot}>
        {props.pic ?  <img className={style.slotPic} src={props.pic}/> : <img className={style.slotPic} src={imageMissing}/>}
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
        <Tag isParking={props.isParking} isBeginner={props.isBeginner} isRent={props.isRent}/>


        {(props.isProviderAuth || props.isUserAuth) ? (props.isOwner ? <Link to="/" style={{color: 'black', display: 'flex', top: '50%'}}> <div className={style.icon}><MonetizationOnIcon/></div></Link>
                : (isInArray(props.idUser, props.subscribers) ? <button className={style.buttonContainer}><div className={style.icon}><BookmarkIcon/></div></button>:
                <button className={style.buttonContainer}><div className={style.icon}><BookmarkBorderIcon/></div></button>))
            : <div className={style.iconEmpty}/>}
       <div className={style.icon}><MoreHorizIcon/></div>
    </div>);
}

export default Slot;
//<Price price={props.price} priceTime={props.priceTime} priceCurriculum={props.priceCurriculum}/>
