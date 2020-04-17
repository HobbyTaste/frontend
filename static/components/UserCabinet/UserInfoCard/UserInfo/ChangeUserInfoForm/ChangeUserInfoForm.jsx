import React, {useState} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from '../../../../Common/FormsControls/FormsControls';
import {connect} from 'react-redux';
import style from './ChangeUserInfoForm.module.css';
import {RedButton} from '../../../../Common/MaterialsButtons';
import UploadPhoto from '../../../../Common/UploadFotoBlock/UploadPhoto';
import {userEdit} from '../../../../../redux/reducers/auth-reducer';

let mainFile = null;
const ChangeUserInfoForm = ({handleSubmit, error}) => {
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

    return (
        <form onSubmit={handleSubmit}>
            <div><Field component={Input} name={"name"} placeholder={"Новое имя"} autoFocus={true} type={"text"} fieldName={"Новое имя"}/></div>
            <div><Field component={Input} name={"email"} placeholder={"Новый email"} type={"email"} fieldName={"Новый email"}/></div>
            {/*<div><Field component={Input} name={"oldPassword"} placeholder={"Старый пароль"} type={"password"} fieldName={"Старый пароль"}/></div>*/}
            <div><Field component={Input} name={"password"} placeholder={"Новый пароль"} type={"password"} fieldName={"Новый пароль"}/></div>
            <UploadPhoto uploadImage={uploadImage} deleteUrl={deleteUrl} url={url}/>
            <div className={style.saveButton}>
                <RedButton text={"СОХРАНИТЬ"} label="Submit" onSubmit={handleSubmit} />
            </div>
            </form>
    );
};

const ChangeReduxForm = reduxForm({ form: 'change' })(ChangeUserInfoForm);

const ChangeForm = (props) => {
    const onSubmit = (formData) => {
        let dataToChange = {};
        if(formData.name !== undefined) {
            dataToChange['name'] = formData.name;
        }
        if(formData.password !== undefined) {
            dataToChange['password'] = formData.password;
        }
        if(formData.email !== undefined) {
            dataToChange['email'] = formData.email;
        }
        if(mainFile !== null) {
            dataToChange['avatar'] = mainFile;
        }
        props.userEdit(dataToChange);
    };
    return(
        <div>
            <h1 className={style.label}>Настройка профиля</h1>
            <ChangeReduxForm onSubmit={onSubmit} />
        </div>
    );
};

export default connect(null, {userEdit})(ChangeForm);
