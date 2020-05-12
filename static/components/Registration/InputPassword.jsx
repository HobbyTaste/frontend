import React from 'react';
import style from './RegistrationNew.css';
import Input from '@material-ui/core/Input';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '0',
        paddingTop: '4px',
    },
}));

export const InputPassword = ({ input, label, meta, ...custom }) => {
    const classes = useStyles();
    const [isVisible, setVisible] = React.useState(false);
    const handleClick = () => {
        setVisible(!isVisible);
    };
    const hasError = meta.touched && meta.error;
    return (
        <div>
        {
            isVisible ?
                <div className={style.formContainerPassword + " " + (hasError ? style.formError : "")} >
                    <Input className={style.formInputPassword } name={'password'} type={'text'} placeholder={'Пароль'}
                           disableUnderline={true} label={custom.fieldName}
                           {...input}
                           {...custom}/>
                        <Button className={classes.root} onClick={handleClick}><p className={style.icon}><VisibilityOffIcon/></p></Button>
                </div>
:
    <div className={style.formContainerPassword + " " + (hasError ? style.formError : "")}>
        <Input className={style.formInputPassword } name={'password'} type={'password'} placeholder={'Пароль'}
               disableUnderline={true} label={custom.fieldName}
            {...input}
            {...custom}/>
            <Button className={classes.root} onClick={handleClick}><p className={style.icon}><VisibilityIcon/></p></Button>
    </div>

}</div>)

};

export const InputSign = ({ input, label, meta, ...custom }) => {
    const hasError = meta.touched && meta.error;
    return (
        <Input
            id="outlined-input"
            label={custom.fieldName}
            type={custom.type}
            className={style.formInput + " " + (hasError ? style.formError : "")}
            variant="outlined"
            {...input}
            {...custom}
        />
    );
};
