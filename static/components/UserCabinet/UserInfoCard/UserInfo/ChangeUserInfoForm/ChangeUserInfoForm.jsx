import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Input } from '../../../../Common/FormsControls/FormsControls';
import style from './ChangeUserInfoForm.module.css';
import { RedButton } from '../../../../Common/MaterialsButtons';
import UploadPhoto from '../../../../Common/UploadFotoBlock/UploadPhoto';
import { userEdit } from '../../../../../redux/reducers/auth-reducer';

let mainFile = null;
const ChangeUserInfoForm = ({ handleSubmit, error }) => {
    const [url, setUrl] = useState('');
    const [file, setFile] = useState(null);
    const uploadImage = (e) => {
        const reader = new FileReader();
        const photoFile = e.target.files[0];
        reader.onloadend = () => {
            setUrl(`${reader.result}`);
            setFile(photoFile);
            mainFile = photoFile;
        };
        reader.readAsDataURL(photoFile);
    };
    const deleteUrl = () => {
        setUrl('');
        setFile(null);
        mainFile = null;
    };

    return (
        <form onSubmit={handleSubmit}>
            <div><Field component={Input} name={'name'} placeholder={'Новое имя'} autoFocus={true} type={'text'} fieldName={'Новое имя'}/></div>
            <div><Field component={Input} name={'email'} placeholder={'Новый email'} type={'email'} fieldName={'Новый email'}/></div>
            <div><Field component={Input} name={'metro'} placeholder={'Новая станция метро'} type={'metro'} fieldName={'Новая станция метро'}/></div>
            {/* <div><Field component={Input} name={"oldPassword"} placeholder={"Старый пароль"} type={"password"} fieldName={"Старый пароль"}/></div> */}
            <div><Field component={Input} name={'password'} placeholder={'Новый пароль'} type={'password'} fieldName={'Новый пароль'}/></div>
            <UploadPhoto uploadImage={uploadImage} deleteUrl={deleteUrl} url={url}/>
            <div className={style.saveButton}>
                <RedButton text={'Сохранить'} label="Submit" onSubmit={handleSubmit} />
            </div>
        </form>
    );
};

const ChangeReduxForm = reduxForm({ form: 'change' })(ChangeUserInfoForm);

const ChangeForm = (props) => {
    const onSubmit = (formData) => {
        const dataToChange = {};
        if (formData.name !== undefined) {
            dataToChange.name = formData.name;
        }
        if (formData.password !== undefined) {
            dataToChange.password = formData.password;
        }
        if (formData.email !== undefined) {
            dataToChange.email = formData.email;
        }
        if (mainFile !== null) {
            dataToChange.avatar = mainFile;
        }
        props.userEdit(dataToChange);
    };
    return (
        <div>
            <h1 className={style.label}>Редактирование профиля</h1>
            <ChangeReduxForm onSubmit={onSubmit} />
        </div>
    );
};

export default connect(null, { userEdit })(ChangeForm);
