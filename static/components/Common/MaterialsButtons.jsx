import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {purple, red} from "@material-ui/core/colors";
import {ThemeProvider} from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#19f391',
            main: '#19B95D',
            dark: '#128040',
            contrastText: '#fff',
        },
        secondary: {
            light: 'rgba(255,2,98,0.57)',
            main: '#ff0266',
            dark: '#ca025c',
            contrastText: '#fff',
        },
        third: {
            light: 'rgba(246,0,255,0.57)',
            main: '#9f00ff',
            dark: '#7000ca',
            contrastText: '#fff',
        }
    },
});

const useStyles = makeStyles(theme => ({
    button: {
        height: '50px',
        width: '60px',
        padding: '0 60px',
        borderRadius: '10px',
        float: 'right'
    },
    color: {
        height: '50px',
        width: '60px',
        padding: '0 60px',
        borderRadius: '10px',
        marginLeft: '5px',
        fontWeight: 'bold',
        fontSize: '20px',
        boxShadow: 'inset 0 0 5px 1px #128040'
    },
    buttonLarge: {
        margin: theme.spacing(2),
        height: '60px',
        width: '160px',
        borderRadius: '10px',
        float: 'right',
        textAlign: 'left'
    },
    buttonLong: {
        margin: theme.spacing(2),
        height: '40px',
        width: '180px',
        borderRadius: '10px',
        float: 'right',
        textAlign: 'left'
    },
    addHobbyButton: {
        height: '40px',
        width: '95%',
        float: 'right',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    smallHobbyButton: {
        marginTop: '5px',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '50px',
        width: '142px',
    }
}));

export const SmallHobbyButton = (props) => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <Button theme={theme} variant="contained" color="primary" className={classes.smallHobbyButton} onClick={props.onSubmit}>
                {props.text}
            </Button>
        </ThemeProvider>
    );
};

export const HobbyCardAddButton = (props) => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <Button theme={theme} variant="contained" color="primary" className={classes.addHobbyButton} onClick={props.onSubmit}>
                {props.text}
            </Button>
        </ThemeProvider>
    );
};

export const GreenButton = (props) => {
    const classes = useStyles();
    return (
        <div>
            {props.disabled === "ok" ? <ThemeProvider theme={theme}>
                <Button theme={theme} variant="contained" color="primary" className={classes.button} disabled>
                    {props.text}
                </Button>
            </ThemeProvider> : <ThemeProvider theme={theme}>
                <Button theme={theme} variant="contained" color="primary" className={classes.button} onClick={props.onSubmit}>
                    {props.text}
                </Button>
            </ThemeProvider> }
        </div>
    );
};

export const GreenLargeButton = (props) => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <Button theme={theme} variant="contained" color="primary" className={classes.buttonLong} onClick={props.onSubmit}>
                {props.text}
            </Button>
        </ThemeProvider>
    );
};

export const RedButton = (props) => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <Button theme={theme} variant="contained" color="secondary" className={classes.button} onClick={props.onSubmit}>
                {props.text}
            </Button>
        </ThemeProvider>
    );
};

export const ColorButton = (props) => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <Button theme={theme} variant="contained" color="primary" className={classes.color} onClick={props.onSubmit}>
                {props.text}
            </Button>
        </ThemeProvider>
    );
};

export const RedButtonLarge = (props) => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <Button theme={theme} variant="contained" color="secondary" className={classes.buttonLarge} onClick={props.onSubmit}>
                {props.text}
            </Button>
        </ThemeProvider>
    );
};



export const RedLongButton = (props) => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <Button theme={theme} variant="contained" color="secondary" className={classes.buttonLong} onClick={props.onSubmit}>
                {props.text}
            </Button>
        </ThemeProvider>
    );
};