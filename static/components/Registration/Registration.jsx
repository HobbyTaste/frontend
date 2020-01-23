import React, {useState} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input, PartnerInput} from "../Common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {createNewUser} from "../../redux/reducers/auth-reducer";
import style from ".././Header/LoginUser/SignIn/SignIn.module.css";
import {RedButton} from "../Common/MaterialsButtons";
import UploadPhoto from "../Common/UploadFotoBlock/UploadPhoto";

let mainFile = null;
const RegistrationForm = ({handleSubmit, error}) => {
    let [url, setUrl] = useState('');
    let [file, setFile] = useState(null);
    let uploadImage = (e) => {
        let reader = new FileReader();
        let photo_file = e.target.files[0];
        reader.onloadend = () => {
            setUrl(`${reader.result}`);
            setFile(photo_file);
            mainFile = photo_file;
        };
        reader.readAsDataURL(photo_file)
    };
    const deleteUrl = () => {
        setUrl('');
        setFile(null);
        mainFile = null;
    };
    return(
        <form onSubmit={handleSubmit}>
            <div><Field component={PartnerInput} name={"email"} placeholder={"Email *"} autoFocus={true} fieldName={"Email"}/></div>
            <div><Field component={PartnerInput} name={"password"} placeholder={"Пароль *"} type={"password"} fieldName={"Пароль"}/></div>
            <div><Field component={PartnerInput} name={"name"} placeholder={"Имя *"} fieldName={"Имя"}/></div>
            <UploadPhoto uploadImage={uploadImage} deleteUrl={deleteUrl} url={url}/>
            <div className={style.ButtonContainer}>
                <RedButton text={"Регистрация"} label="Submit" onSubmit={handleSubmit} />
            </div>

        </form>
    );
};

const RegistrationReduxForm = reduxForm({ form: 'registration' })(RegistrationForm);

const Registration = (props) => {

    const onSubmit = (formData) => {
        props.createNewUser(formData.email, formData.password, formData.name, mainFile);
    };

    return(
        <div>
            <h1 className={style.label}>Регистрация</h1>
            <RegistrationReduxForm onSubmit={onSubmit} />
        </div>
    );
};

export default connect(null, {createNewUser})(Registration);