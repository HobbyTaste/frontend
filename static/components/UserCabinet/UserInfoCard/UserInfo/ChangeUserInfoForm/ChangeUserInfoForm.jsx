import React, { useState } from "react";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import style from "./ChangeUserInfoForm.module.css";
import UploadPhoto from "../../../../Common/UploadFotoBlock/UploadPhoto";
import { userEdit } from "../../../../../redux/actions/userActions";

let mainFile = null;

const ChangeUserInfoForm = ({error, handleSubmit, name, email}) => {
    const [url, setUrl] = useState("");
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
        setUrl("");
        setFile(null);
        mainFile = null;
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={style.inputContainer}>
                <Field component="input" className={style.input} name="name" placeholder={name} />
            </div>
            <div className={style.inputContainer}>
                <Field component="input" className={style.input} name="email" placeholder={email} />
            </div>
            <div className={style.inputContainer}>
                <Field component="input" className={style.input} name="password" type="password" placeholder="Введите новый пароль" />
            </div>
            <div>
                <Field component={UploadPhoto} name="Photo" uploadImage={uploadImage} deleteUrl={deleteUrl} url={url} />
            </div>
            {error && <div style={{color: "red"}}>{error}</div>}
            <button className={style.saveButton} type='submit'>
                Сохранить
            </button>
        </form>
    );
};

const ChangeReduxForm = reduxForm({ form: "change" })(ChangeUserInfoForm);

const ChangeForm = ({handleClick, name, email, userEdit}) => {
    const handleSubmit = async (formData) => {
        const dataToChange = {};
        if (formData.name !== undefined) {
            dataToChange.name = formData.name;
        }
        if (formData.email !== undefined) {
            dataToChange.email = formData.email;
        }
        if (formData.password !== undefined) {
            dataToChange.password = formData.password;
        }
        if (mainFile !== null) {
            dataToChange.avatar = mainFile;
        }
        const editResponse = await userEdit(dataToChange);
        if (editResponse === 'ok') {
            handleClick();
            return;
        }
        if (editResponse === 'non-unique email') {
            throw new SubmissionError({_error: 'Пользователь с таким email уже зарегистрирован'});
        }
        throw new SubmissionError({_error: 'Что-то пошло не так...'});
    };

    return (
        <div>
            <ChangeReduxForm onSubmit={handleSubmit} name={name} email={email}/>
        </div>
    );
};

export default connect(null, { userEdit })(ChangeForm);