import React, {Component} from 'react';
import s from './../Header.module.css';
import {withModalWindow} from "../../../HOC/ModalWindow/ModalWindow";
import Login from "./SignIn/SignIn";
import Registration from "../../Registration/Registration";
import {AnimatedModalWindow} from "../../../HOC/AnimatedModalWindow/AnimatedModalWindow";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        boxSizing: 'border-box',
        border: '1px solid #2F1E0A',
        height: '30px',
        boxShadow: 'none',
        margin: '5px 0px',
        background: '#EDECE8',
        color: '#034488',
        borderRadius: '4px',
        width: '94%',
        padding: '0px 22px',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '20px',
        letterSpacing: '0.16px',
        textAlign: 'center',
        lineHeight: '18px',
        textTransform: 'none',
    },
}));
const LoginUser = (props) => {
    const classes = useStyles();
    return (<div className={s.buttonsContainer}>
            <Button aria-controls="simple-menu" className={classes.button} >Вход</Button>
        </div>
    );
};

export default LoginUser;
