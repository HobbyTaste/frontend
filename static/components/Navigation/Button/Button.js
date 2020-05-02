import React, {Component} from 'react';
import style from './Button.css'
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LinkCategory from '../LinkCategory';

const useStyles = makeStyles(theme => ({
    button: {
        border: '1px solid #2F1E0A',
        margin: '5px 0px',
        background: '#EDECE8;',
        color: '#034488;',
        borderRadius: '4px',
        width: '94%',
        padding: '0',
        height: '75%',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '20px',

        lineHeight: '18px',
        letterSpacing: '0.16px',
        textAlign: 'center',
        textTransform: 'none',
    },
}));

const StyledMenu = withStyles({
    paper: {
        marginTop: '5px',
        maxHeight: '484px',
        background: '#fff',
        width: '135px',
        boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.2), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.14)',
        borderRadius: '4px',
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

export default function SimpleMenu() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={style.buttonContainer}>
            <Button aria-controls="simple-menu" onClick={handleClick} className={classes.button} >Каталог
            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={classes.list}
            >
                <MenuItem onClick={handleClose}> <LinkCategory label='Творчество' className={style.text} url='creativity'/></MenuItem>
                <MenuItem onClick={handleClose}> <LinkCategory label='Рисование' className={style.text} url='art'/></MenuItem>
                <MenuItem onClick={handleClose}> <LinkCategory label='Музыка' className={style.text} url='music'/></MenuItem>
                <MenuItem onClick={handleClose}> <LinkCategory label='Спорт' className={style.text} url='sport'/></MenuItem>
                <MenuItem onClick={handleClose}>  <LinkCategory label='Игровые виды спорта' className={style.text} url='sport_game'/></MenuItem>
                <MenuItem onClick={handleClose}> <LinkCategory label='Единоборства' className={style.text} url='sport_wrestling'/></MenuItem>
                <MenuItem onClick={handleClose}> <LinkCategory label='Зимние виды спорта' className={style.text} url='sport_winter'/> </MenuItem>
                <MenuItem onClick={handleClose}> <LinkCategory label='Танцы' className={style.text} url='dance'/> </MenuItem>
                <MenuItem onClick={handleClose}> <LinkCategory label='Другое' className={style.text} url='other'/></MenuItem>
            </StyledMenu>
        </div>
    );
}
