import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs';
import { GreenButton } from '../../components/Common/MaterialsButtons';
import s from '../../components/Header/Header.module.css'
import Button from '@material-ui/core/Button'; // web.cjs is required for IE 11 support

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
    },
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

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
};

export const AnimatedModalWindow = (Component, text, hobbyProps, isHeader) => {
    let WrapperContainer = (props) => {
        const classes = useStyles();
        const [open, setOpen] = React.useState(false);

        const handleOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };
        return (
            <div >
                <div className={s.buttonSignIn} onClick={handleOpen}>
                    {isHeader ? <Button aria-controls="simple-menu" className={classes.button} >
                        {text}
                    </Button> : <GreenButton text={text} type="button"/>}
                </div>
                <Modal
                    aria-labelledby="spring-modal-title"
                    aria-describedby="spring-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}>
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <Component {...hobbyProps}/>
                        </div>
                    </Fade>
                </Modal>
            </div>
        );
    };
    return (WrapperContainer);
};
