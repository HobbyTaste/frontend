import React, {useState} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from "../../../Common/FormsControls/FormsControls";
import {connect} from "react-redux";
import style from "./ChangeProviderForm.module.css";
import {RedButton} from "../../../Common/MaterialsButtons";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {providerEdit} from "../../../../redux/reducers/provider-reducer";

let mainFile = null;
const ChangeProviderForm = ({handleSubmit, error}) => {
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
            <div><Field component={Input} name={"newName"} placeholder={"Новое имя"} autoFocus={true} type={"text"} fieldName={"Новое имя"}/></div>
            <div><Field component={Input} name={"newEmail"} placeholder={"Новый email"} type={"email"} fieldName={"Новый email"}/></div>
            <div><Field component={Input} name={"oldPassword"} placeholder={"Старый пароль"} type={"password"} fieldName={"Старый пароль"}/></div>
            <div><Field component={Input} name={"newPassword"} placeholder={"Новый пароль"} type={"password"} fieldName={"Новый пароль"}/></div>
            <div><Field component={Input} name={"newPhone"} placeholder={"Новый номер телефона"} type={"telephone"} fieldName={"Новый номер телефона"}/></div>
            <div><Field component={Input} name={"newInfo"} placeholder={"Информация о вас"} type={"text"} fieldName={"Информация о вас"}/></div>
            <div className={style.uploadContainer}>
                <label htmlFor="file">
                    <CloudUploadIcon className={style.upload} style={{ fontSize: 80 }} />
                </label>
                <input type="file" name="file" id="file" onChange={uploadImage} className={style.input}/>
                <div>Загрузить фото</div>
            </div>
            <div className={style.saveButton}>
                <RedButton text={"СОХРАНИТЬ"} label="Submit" onSubmit={handleSubmit} />
            </div>
        </form>
    );
};

const ChangeProviderReduxForm = reduxForm({ form: 'changeProvider' })(ChangeProviderForm);

const ChangeFormProvider = (props) => {
    const onSubmit = (formData) => {
        let dataToChange = {
            name: formData.newName === undefined ? props.curName : formData.newName,
            password: formData.newPassword === undefined ? props.curPassword : formData.newPassword,
            email: formData.newEmail === undefined ? props.curEmail : formData.newEmail,
            phone: formData.newPhone === undefined ? props.curPhone : formData.newPhone,
            info: formData.newInfo === undefined ? props.curInfo : formData.newInfo
        };
        if(mainFile !== null) {
            dataToChange['avatar'] = mainFile;
        }
        props.providerEdit(dataToChange);
    };
    return(
        <div>
            <h1 className={style.label}>Настройка профиля</h1>
            <ChangeProviderReduxForm onSubmit={onSubmit} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        curName: state.providerCabinet.name,
        curPassword: state.providerCabinet.password,
        curEmail: state.providerCabinet.email,
        curAvatar: state.providerCabinet.avatar,
        curPhone: state.providerCabinet.phone,
        curInfo: state.providerCabinet.info
    }
};

export default connect(mapStateToProps, {providerEdit})(ChangeFormProvider);