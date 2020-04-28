import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {ColorButton} from '../../Common/MaterialsButtons';
import {PartnerInput} from '../../Common/FormsControls/FormsControls';
import {loginProvider} from '../../../redux/actions/providerActions';
import style from './ProviderLogin.module.css'

const ProviderLoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit} className={style.headerForm}>
                <Field component={PartnerInput} name={"email"} placeholder={"Email *"} autoFocus={true} type={"email"} fieldName={"Email"}/>
                <Field component={PartnerInput} name={"password"} placeholder={"Пароль *"} type="password" fieldName="Пароль"/>
            <ColorButton text={"ВОЙТИ"} label="Submit" onSubmit={handleSubmit} />
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
           {/* <h1 style={{marginLeft: '20px'}}>Вход</h1>*/}
            <ProviderLoginReduxForm onSubmit={onSubmit} />
        </div>
    );
};

export default connect(null, {loginProvider})(ProviderLogin);
