import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import style from './Card.module.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { isInArray } from '../../../utils/functions';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'top',
        marginRight: '5px',
        color: '#178FD6',
    },
    stars: {
        color: '#178FD6',
    },
    countStars: {
        margin: '0px 5px',
    },
    span: {
        height: '10px',
    }
}));


function HalfRating(props) {
    const classes = useStyles();
    const rating = props.rating;
    return (
        <div className={classes.root}>
            <Rating className={classes.stars} size={'small'} name="half-rating-read"
                    defaultValue={rating} precision={0.2}
                    emptyIcon={<span className={classes.span}> <StarBorderIcon fontSize="inherit"/> </span>} readOnly/>
        </div>
    );
}


const Card = (props) => {
    return (<div>
            <div className={style.card}>
            <span className={style.cardDescription}>
                <div className={style.cardHeader}>
                    <span className={`${style.name} ${style.colorWhiteCard}`}>{props.name}</span>
                    <div className={`${style.metro} ${style.colorBlueCard}`}>
                    <LocationOnIcon style={{
                        color: '#178FD6',
                        fontSize: 'small'
                    }}/> {props.metro}
                     </div>
                     <div className={`${style.address} ${style.colorGrayCard}`}>{props.address}</div>
                </div>
                <div className={style.cardFunction}>
                       <HalfRating rating={props.rating}/>
                        <span className={style.icon}>
                            <span className={style.iconMore}>
                            <NavLink to={`hobby/card/${props.id}`}><MoreHorizIcon
                                style={{ color: '#FFFFFF' }} /></NavLink>
                                </span>
                    {(props.isProviderAuth || props.isUserAuth) ? (props.isOwner ?
                            <Link to="/provider/cabinet/monetization" style={{
                                display: 'flex',
                                width: '50%',
                                justifyContent: 'center',
                            }}>
                                <span className={style.iconMonetization}><MonetizationOnIcon/></span>
                            </Link>
                            : (isInArray(props.idUser, props.subscribers) ?
                                <button className={style.buttonContainer} onClick={(e) => props.onClick(e, props.id)}>
                                    <span className={style.icon}><BookmarkIcon style={{ color: '#FFFFFF' }}/></span>
                                </button> :
                                <button className={style.buttonContainer} onClick={(e) => props.onClick(e, props.id)}>
                                    <span className={style.icon}><BookmarkBorderIcon style={{ color: '#FFFFFF' }}/></span>
                                </button>)
                    ) : <div className={style.iconEmpty}></div>}
                    </span>
        </div>
    </span>
            </div>
        </div>
    )
        ;
};
export default Card;
