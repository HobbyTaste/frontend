import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import style from './Button.module.css';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
import {GreenLargeButton} from "../../Common/MaterialsButtons";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ProviderLogin from "./ProviderLogin";
import ProviderRegistration from "../../ProviderRegistration/ProviderRegistration";
import hobby from '../../../assets/images/hobby.jpg'

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
        backgroundColor: 'red'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const FullScreenDialogButton = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <div onClick={handleClickOpen} >
                <GreenLargeButton text={"ВХОД ПАРТНЕРА"} />
            </div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <div className={style.header}>
                        <div className={style.headerTitle}>
                            <ArrowBackIosIcon style={{fontSize: 40}} className={style.closeButton} onClick={handleClose}/>
                            <span className={style.headerText}>Вход в личный кабинет партнера</span>
                            </div>
                                <ProviderLogin />
                    </div>
                </AppBar>
                <div>
                    <div className={style.layout}>
                        <div className={style.stuffContainer}>
                            <div className={style.text}>
                                Поделитесь информацией о ваших хобби, и мы найдем людей, которые с удовольствием посетят ваши
                                кружки и занятия.
                            </div>
                            <img src={hobby} alt="hobby" className={style.image}/>
                        </div>
                        <div className={style.registrationForm}>
                            <ProviderRegistration />
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};