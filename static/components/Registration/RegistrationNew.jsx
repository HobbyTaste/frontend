import React, { useState } from 'react';
import style from './RegistrationNew.css';
import { connect } from 'react-redux';
import { createNewUser } from '../../redux/actions/userActions';
import { Field, reduxForm } from 'redux-form';
import ButtonReg from './ButtonRegistration';
import { InputPassword, InputSign } from './InputPassword';
import { createNewProvider } from '../../redux/actions/providerActions';


let mainFile = null;

const FormHeader = (props) => {
    return (
        <div className={style.formHeader}>
            <button className={style.enterButton} onClick={props.onClickUserSign}>
                Вход пользователя
            </button>
            <button className={style.enterButton} onClick={props.onClickProviderSign}>
                Вход партнера
            </button>
        </div>
    );
};

const FormMain = ({handleSubmit, isProvider, onClickUserReg, onClickProviderReg, error}) => {
    let styleProvider = style.UserPartnerButton;
    let styleUser = style.UserPartnerButton;
    let text = "Регистрация пользователя";
    let placeholder = "Имя";
    if (isProvider){
        text = "Регистрация партнера";
        placeholder = "Название организации";
        styleProvider += ' ' +  style.UserPartnerButtonActive;
    }
    else{
        styleUser += ' ' +  style.UserPartnerButtonActive;
    }
    return (
        <div className={style.formMain}>
            <div>
                <button className={styleUser} onClick={onClickUserReg}>
                    Пользователь
                </button>
                <button className={styleProvider} onClick={onClickProviderReg}>
                    Партнер
                </button>
            </div>
            <h3 className={style.formH3}>{text}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <div><Field component={InputSign} name={"name"} disableUnderline={true} placeholder={placeholder} autoFocus={true}/></div>
                </div>
                <div >
                    <Field component={InputSign} name={"email"} placeholder={"Логин"} disableUnderline={true} autoFocus={true}/>
                </div>
                <div>
                    <Field component={InputPassword} name={"password"}/>
                </div>
                <div>
                    <ButtonReg label="Submit" onSubmit={handleSubmit} text={"Зарегистрироваться"}/>
                </div>
            </form>
        </div>
    );
};


const RegistrationReduxForm = reduxForm({ form: 'registration' })(FormMain);

const RegistrationNew = (props) => {

    const onSubmit = (formData) => {
        if (props.isProvider){
            props.createNewProvider(formData.name, formData.password, formData.email, mainFile);
        }
        else {
            props.createNewUser(formData.email, formData.password, formData.name, mainFile);
        }
    };
    return(
        <div className={style.formContainerRegistration}>
            <header><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </header>
            <FormHeader onClickProviderSign = {props.onClickProviderSign} onClickUserSign={props.onClickUserSign}/>
            <RegistrationReduxForm onSubmit={onSubmit} isProvider = {props.isProvider} onClickUserReg={props.onClickUserReg} onClickProviderReg={props.onClickProviderReg}/>
        </div>
    );
};

export default connect(null, {createNewUser, createNewProvider})(RegistrationNew);
