import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input, PartnerInput, Password} from "../../../Common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {login} from "../../../../redux/actions/userActions";
import style from "./SignIn.module.css";
import {RedButton} from "../../../Common/MaterialsButtons";

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div><Field component={PartnerInput} name={"email"} placeholder={"Email *"} autoFocus={true} type={"email"} fieldName={"Email"}/></div>
            <div><Field component={PartnerInput} name={"password"} placeholder={"Пароль *"} type="password" fieldName="Пароль"/></div>
            <div className={style.ButtonContainer}>
            <RedButton text={"ВОЙТИ"} label="Submit" onSubmit={handleSubmit}>ВОЙТИ</RedButton>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password);
    };

    return(
        <div>
            <h1 className={style.label}>Вход</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
};

export default connect(null, {login})(Login);
