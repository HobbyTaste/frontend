import React, {Component} from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';

 //он должен откуда-то импортироваться потом
const answers =[{
    star: 5,
    answer_id:1,
}, {
    star: 4,
    answer_id: 2,}
    ,
    {star:5,
        answer_id: 3,}

]

function avarageStars(answers) {
    const stars = answers.map(item => item.star);
    return ((stars.reduce((a,b) => a+ b, 0) / stars.length) || 0)
}


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        color: 'rgba(0, 0, 0, 0.54)',
    },
    stars:{
        color: 'rgba(0, 0, 0, 0.54)'
    },
    countStars:{
        margin: '0px 5px',
    }
}));



export default function HalfRating(props) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            { props.isUserAuth
                ? <Rating className={classes.stars} size='small' name="half-rating" defaultValue={avarageStars(answers)} precision={0.5} emptyIcon={<StarBorderIcon fontSize="inherit" />}/>
                : <Rating className={classes.stars} size='small' name="half-rating-read" defaultValue={avarageStars(answers)} precision={0.5} emptyIcon={<StarBorderIcon fontSize="inherit" />} readOnly /> }
            <span className={classes.countStars}> {answers.length}</span>
        </div>
    );
}
