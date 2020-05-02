import React, { Component } from 'react';
import s from './../Header.module.css';
import { withModalWindow } from '../../../HOC/ModalWindow/ModalWindow';
import Login from './SignIn/SignIn';
import Registration from '../../Registration/Registration';
import { AnimatedModalWindow } from '../../../HOC/AnimatedModalWindow/AnimatedModalWindow';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LoginModalWindow from '../../../HOC/LoginModalWindow/LoginModalWindow';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles(theme => ({
    buttonEnter: {
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
    buttonWindow: {
        background: '#178FD6',
        width: '50%',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '13px',
        textAlign: 'center',
        color: '#FFFCF6',
    },
    dialogTitle: {
        background: '#178FD6',
        display: 'flex',
        justifyContent: 'space-between',
    },
    root:{
    },
    paperWidthXs:{
        maxWidth: '320px',
    },
    paperScrollPaper:{

        maxWidth: '320px',
    }

}));
const LoginUser = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (<div className={s.buttonsContainer}>
            <Button aria-controls="simple-menu" className={classes.buttonEnter} onClick={handleClickOpen}>Вход</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'xs'}
                    className={classes.root}>
                <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
                    <Button className={classes.buttonWindow}>Вход партнера</Button>
                    <Button className={classes.buttonWindow}>Регистрация</Button>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LoginUser;
