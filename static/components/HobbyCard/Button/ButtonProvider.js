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
        paddingLeft: '6px',
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '170px',
        width: '176px',
        marginLeft: '0px',
        background: '#EDECE8',
        border: '1px solid #807466',
        borderRadius: '4px',
        textTransform: 'none',
        maxHeight: '36px',
    }

}));

export default function ButtonProvider(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Button className={classes.button} onClick={props.onClick}><p className={style.text}>{props.text}</p> <p className={style.iconProvider}><EditIcon style={{ fontSize: 20}}/></p></Button>
        </div>
    );
}
