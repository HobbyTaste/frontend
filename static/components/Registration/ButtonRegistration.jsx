import Button from '@material-ui/core/Button';
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    button:
        {   display: 'flex',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '14px',
            lineHeight: '16px',
            letterSpacing: '1.25px',
            textTransform: 'uppercase',
            color: '#034488',
            backgroundColor: '#FFFFFF',
            border: 'none',
            float: 'right',
            marginRight: '33px',
        },


}));

export default function ButtonReg(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Button className={classes.button} onClick={props.onSubmit} >{props.text}</Button>
        </div>
    );

}
