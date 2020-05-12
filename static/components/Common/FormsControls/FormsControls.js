import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Select from 'react-select';
import s from '../../MainPage/SearchContent/Search/Search.module.css';
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '0 10px'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%',
    },
    containerReg:{
        display: 'flex',
        flexWrap: 'wrap',
        height: '34.5px',
    },
    registrationTextField:{
        boxSizing: 'border-box',
        width: '100%',
        height: '34.5px',
        border: '1px solid #034488',
        borderRadius: '3.5px',
        paddingLeft: '10px',
        marginBottom: '22px',
        marginLeft: '29px',

        fontStyle: 'normal',
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '0.15px',
        color: 'rgba(0, 0, 0, 0.6)',
    },
    partnerTextField: {
        backgroundColor: 'white',
        borderRadius: '5px',
        width: '300px'
    }
}));

const selectStyles = {
    control: (styles) => ({
        ...styles,
        backgroundColor: 'white',
        height: '70px',
        fontSize: '24px',
        marginLeft: 'auto',
        marginRight: 'auto'
    }),

    option: (styles, {isFocused, isSelected}) => ({
        ...styles,
        backgroundColor: isFocused ? 'rgba(25,243,145,0.59)' : isSelected ? '#19f391' : 'white',
        cursor: 'pointer',
        fontSize: '24px',
        color: '#000',
        borderColor: 'none'
    })
};

export const Input = ({
                          input, label, meta: {error}, ...custom
                      }) => {
    const classes = useStyles();
    return (
        <div>
            {error ? <div className={classes.container}>
                <TextField
                    error id="outlined-error-helper-text"
                    label={error}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    errortext={error}
                    {...input}
                    {...custom}
                />
            </div> : <div className={classes.container}>
                <TextField
                    id="outlined-textarea"
                    className={classes.textField}
                    label={custom.fieldName}
                    type={custom.type}
                    margin="normal"
                    variant="outlined"
                    {...input}
                    {...custom}
                />
            </div>}
        </div>
    );
};

export const PartnerInput = ({input, label, meta: {error}, ...custom}) => {
    const classes = useStyles();
    return (
        <div>
            {error ? <div className={classes.container}>
                <TextField
                    error id="outlined-error-helper-text"
                    label={error}
                    className={classes.partnerTextField}
                    margin="normal"
                    variant="outlined"
                    errortext={error}
                    {...input}
                    {...custom}
                />
            </div> : <div className={classes.container}>
                <TextField
                    id="outlined-textarea"
                    className={classes.partnerTextField}
                    label={custom.fieldName}
                    type={custom.type}
                    margin="normal"
                    variant="outlined"
                    {...input}
                    {...custom}
                />
            </div>}
        </div>
    );
};

export const MySelect = (props) => {
    const {input, options, placeholder} = props;
    return (
        <div className={s.searchContainer}>
            <Select
                {...input}
                onChange={(value) => input.onChange(value)}
                onBlur={() => input.onBlur(input.value)}
                options={options}
                placeholder={placeholder}
                styles={selectStyles}
                className={s.selects}
            />
        </div>
    );
};
