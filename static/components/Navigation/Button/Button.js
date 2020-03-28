import React, {Component} from 'react';
import style from './Button.css'
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
    button: {
        margin: '5px 0px',
        background: '#E9F0C0',
        color: '#739C3E',
        borderRadius: '4px',
        width: '94%',
        padding: '0',
        height: '75%',
        border:'none',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '20px',
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
                <MenuItem onClick={handleClose}> <Link to='/search/sport' className={style.text} >Subtitle 1</Link></MenuItem>
                <MenuItem onClick={handleClose}>  <Link to='/' className={style.text} >Subtitle 2</Link></MenuItem>
                <MenuItem onClick={handleClose}>  <Link to='/' className={style.text} >Subtitle 3</Link></MenuItem>
                <MenuItem onClick={handleClose}>  <Link to='/' className={style.text}>Subtitle 2</Link></MenuItem>
                <MenuItem onClick={handleClose}>  <Link to='/' className={style.text}>Subtitle 3</Link></MenuItem>
                <MenuItem onClick={handleClose}>  <Link to='/' className={style.text} >Subtitle 2</Link></MenuItem>
                <MenuItem onClick={handleClose}>  <Link to='/' className={style.text} >Subtitle 3</Link></MenuItem>
                <MenuItem onClick={handleClose}>  <Link to='/' className={style.text}>Subtitle 2</Link></MenuItem>
                <MenuItem onClick={handleClose}>  <Link to='/' className={style.text}>Subtitle 3</Link></MenuItem>
                <MenuItem onClick={handleClose}>  <Link to='/' className={style.text} >Subtitle 2</Link></MenuItem>
                <MenuItem onClick={handleClose}>  <Link to='/' className={style.text} >Subtitle 3</Link></MenuItem>
                <MenuItem onClick={handleClose}>  <Link to='/' className={style.text}>Subtitle 2</Link></MenuItem>
                <MenuItem onClick={handleClose}>  <Link to='/' className={style.text}>Subtitle 3</Link></MenuItem>
                <MenuItem onClick={handleClose}>  <Link to='/' className={style.text} >Subtitle 2</Link></MenuItem>
                <MenuItem onClick={handleClose}>  <Link to='/' className={style.text} >Subtitle 3</Link></MenuItem>
                <MenuItem onClick={handleClose}>  <Link to='/' className={style.text}>Subtitle 2</Link></MenuItem>
                <MenuItem onClick={handleClose}>  <Link to='/' className={style.text}>Subtitle 3</Link></MenuItem>


            </StyledMenu>
        </div>
    );
}
