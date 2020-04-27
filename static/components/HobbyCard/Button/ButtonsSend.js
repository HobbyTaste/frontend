import style from './Buttons.css';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    button:{
        margin: '0px 8px',
        display: 'flex',
        marginLeft: '0px',
        border: '1px solid #807466',
        background: '#EDECE8;',
        borderRadius: '4px',
        textTransform: 'none',
        minWidth: '115px',
        fontSize: '18px',
    },
    buttonSend:{
       height: '36px',
    },
    buttonSearch:{
        height: '30px',
    }
}));

export default function ButtonsSend(props) {
    const classes = useStyles();
    let currentClass = classes.button;
    if (props.type == "button"){
        currentClass += (' ' + classes.buttonSearch);
    }
    if(props.type=="submit"){
        currentClass += (' ' + classes.buttonSend);
    }
    return (
        <div className={classes.root}>
            <Button type={props.type} onClick={props.onClick} className={currentClass}><p className={style.text}>{props.text}
            </p> </Button>
        </div>
    );
}
