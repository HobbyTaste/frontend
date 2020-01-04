import React, {useState} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from "../Common/FormsControls/FormsControls";
import style from "./ProviderRegistration.module.css";
import {GreenLargeButton} from "../Common/MaterialsButtons";
import {connect} from "react-redux";
import {createNewProvider} from "../../redux/reducers/provider-reducer";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloseIcon from '@material-ui/icons/Close';

let mainFile = null;
const ProviderRegistrationForm = ({handleSubmit, error}) => {
    let [url, setUrl] = useState('');
    let [file, setFile] = useState(null);
    let uploadImage = (e) => {
        let reader = new FileReader();
        let photo_file = e.target.files[0];
        reader.onloadend = () => {
            setUrl(`${reader.result}`);
            setFile(photo_file);
            mainFile = file;
        };
        reader.readAsDataURL(photo_file)
    };
    const deleteUrl = () => {
        setUrl('');
        setFile(null);
        mainFile = null;
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <div><Field component={Input} name={"organization"} placeholder={"Название организации *"}
                        autoFocus={true} fieldName={"Название организации"}/></div>
            <div><Field component={Input} name={"telephone"} placeholder={"Контактный телефон *"} type={"telephone"}
                        fieldName={"Контактный телефон"}/>
            </div>
            <div><Field component={Input} name={"email"} placeholder={"Почта *"} type={"email"} fieldName={"Почта"}/>
            </div>
            <div><Field component={Input} name={"info"} placeholder={"Информация о вас *"}
                        fieldName={"Информация о вас"}/></div>
            <div><Field component={Input} name={"password"} placeholder={"Пароль для входа в личный кабинет *"}
                        type={"password"} fieldName={"Пароль для входа в личный кабинет"}/></div>
            <div><Field component={Input} name={"second_password"} placeholder={"Повторите пароль *"} type={"password"}
                        fieldName={"Повторите пароль"}/></div>
        </form>
            <div className={style.uploadBlock}>
                <div className={style.cloud}>
                    <label htmlFor="file">
                        <CloudUploadIcon className={style.upload} style={{fontSize: 80}}/>
                    </label>
                    <input type="file" name="file" id="file" onChange={uploadImage} className={style.input}/>
                    <div>Загрузить фото</div>
                </div>
                <div className={style.image}>
                    {url ? <div>
                            <img className={style.avatar} src={`${url}`} alt="картинка"/>
                            <CloseIcon className={style.closeIcon} onClick={deleteUrl}/>
                        </div> : ''}
                </div>
            </div>
            <div className={style.buttons}>
                <GreenLargeButton text={"ЗАРЕГИСТРИРОВАТЬСЯ"} label="Submit" onSubmit={handleSubmit}/>
            </div>
        </div>
    );
};

const RegistrationReduxForm = reduxForm({form: 'providerRegistration'})(ProviderRegistrationForm);

const ProviderRegistration = (props) => {
//name, password, email, avatar, phone, info
    const onSubmit = (formData) => {
        props.createNewProvider(formData.organization, formData.password, formData.email,
            mainFile, formData.telephone, formData.info);
    };
    return (
        <div>
            <div>
                <h1> Регистрация партнера</h1>
                <RegistrationReduxForm onSubmit={onSubmit} handeClose={props.handleClose}/>
            </div>
        </div>
    );
};

export default connect(null, {createNewProvider})(ProviderRegistration);