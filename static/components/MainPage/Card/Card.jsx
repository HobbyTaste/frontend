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
        marginRight:'5px',
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
        <span className={style.card}>
            <span className={style.cardDescription}>
                <div className={style.cardHeader}>
                    <span className={`${style.name} ${style.colorWhiteCard}`}>{props.name}</span>
                    <HalfRating rating={props.rating}/>
                </div>
                <span className={style.icon}><NavLink to={`hobby/card/${props.id}`}><MoreHorizIcon
                    style={{ color: '#FFFFFF' }}/></NavLink></span>
                <div className={`${style.metro} ${style.colorBlueCard}`}>
                    <LocationOnIcon style={{
                        color: '#178FD6',
                        fontSize: 'small'
                    }}/> {props.metro}
                </div>
                <div className={`${style.address} ${style.colorGrayCard}`}>{props.address}</div>
                {(props.isProviderAuth || props.isUserAuth) ? (props.isOwner ?
                        <Link to="/provider/cabinet/monetization" style={{
                            color: 'black',
                            display: 'flex',
                            top: '50%',
                            float: 'right',
                            marginRight: '20px',
                            transform: 'translate(50%, -80%)',
                            marginTop: '8px',
                        }}>
                            <span className={style.iconMonetization}><MonetizationOnIcon/></span>
                        </Link>
                        : (isInArray(props.idUser, props.subscribers) ? <button className={style.buttonContainer} onClick={(e) => props.onClick(e, props.id)}>
                                <span className={style.icon}><BookmarkIcon style={{ color: '#FFFFFF' }}/></span>
                            </button> :
                            <button className={style.buttonContainer}  onClick={(e) => props.onClick(e, props.id)}>
                                <span className={style.icon}><BookmarkBorderIcon style={{ color: '#FFFFFF' }}/></span>
                            </button>)
                ) : <div className={style.iconEmpty}/>}
            </span>
        </span>
    </div>);
};
export default Card;
