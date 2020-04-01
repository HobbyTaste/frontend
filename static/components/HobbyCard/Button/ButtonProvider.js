import style from './Buttons.css';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import React from 'react';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    button:{
        margin: '0px 8px',
        display: 'flex',
        maxWidth: '170px',
        marginLeft: '0px',
        background: '#E9F0C0',
        borderRadius: '4px',
        textTransform: 'none',
        maxHeight: '36px',
    }

}));

export default function ButtonInMyHobby(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Button className={classes.button}><p className={style.text}>{props.text}</p> <p className={style.iconProvider}><EditIcon style={{ fontSize: 20}}/></p></Button>
        </div>
    );
}
