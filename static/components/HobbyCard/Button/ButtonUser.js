import style from './Buttons.css';
import Button from '@material-ui/core/Button';
import React from 'react';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    button:{
        display: 'flex',
        marginLeft: '0px',
        background: '#E9F0C0',
        borderRadius: '4px',
        textTransform: 'none',
        maxHeight: '36px',
    }

}));

export default function ButtonInMyHobby() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Button className={classes.button}><p className={style.text +' ' + style.textAddMyHobby}>В мои хобби</p> <p className={style.icon}><BookmarkBorderIcon /></p></Button>
        </div>
    );
}
