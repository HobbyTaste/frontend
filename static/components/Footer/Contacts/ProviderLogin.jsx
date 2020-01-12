import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";
import {RedButton} from "../../Common/MaterialsButtons";
import {Input} from "../../Common/FormsControls/FormsControls";
import {loginProvider} from "../../../redux/reducers/provider-reducer";
import style from "../../Header/LoginUser/SignIn/SignIn.module.css";

const ProviderLoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div><Field component={Input} name={"email"} placeholder={"Email *"} autoFocus={true} type={"email"} fieldName={"Email"}/></div>
            <div><Field component={Input} name={"password"} placeholder={"Пароль *"} type="password" fieldName="Пароль"/></div>
            <div className={style.ButtonContainer}>
            <RedButton text={"ВОЙТИ"} label="Submit" onSubmit={handleSubmit}>ВОЙТИ</RedButton>
            </div>
        </form>
    );
};

const ProviderLoginReduxForm = reduxForm({ form: 'providerLogin' })(ProviderLoginForm);

const ProviderLogin = (props) => {

    const onSubmit = (formData) => {
        props.loginProvider(formData.email, formData.password);
    };

    return(
        <div>
            <h1 style={{marginLeft: '20px'}}>Вход</h1>
            <ProviderLoginReduxForm onSubmit={onSubmit} />
        </div>
    );
};

export default connect(null, {loginProvider})(ProviderLogin);