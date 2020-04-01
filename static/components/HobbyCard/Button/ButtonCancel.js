import style from './Buttons.css';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import React from 'react';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    buttonCancel:{
        margin: '0px 8px',
        display: 'flex',
        marginLeft: '0px',
        background: '#AEC55D',
        borderRadius: '4px',
        textTransform: 'none',
        maxHeight: '36px',
        minWidth: '115px'
    },


}));

export default function ButtonСancel(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Button className={classes.buttonCancel}><p className={style.textCancel}>Отменить</p> </Button>
        </div>
    );

}
