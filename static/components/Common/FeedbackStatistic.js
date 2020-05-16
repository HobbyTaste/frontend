import React, { Component } from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        color: 'rgba(0, 0, 0, 0.54)',
    },
    stars: {
        color: 'rgba(0, 0, 0, 0.54)'
    },
    countStars: {
        margin: '0px 5px',
    }
}));


export default function HalfRating(props) {
    const classes = useStyles();
    const rating = props.rating;
    return (
        <div className={classes.root}>
                <Rating className={classes.stars} size='small' name="half-rating-read" defaultValue={rating} precision={0.5}
                          emptyIcon={<StarBorderIcon fontSize="inherit"/>} readOnly/>
            <span className={classes.countStars}>{rating}</span>
        </div>
    );
}
