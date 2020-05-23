import React, { useState } from "react";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import style from "./ChangeProviderForm.module.css";
import { providerEdit } from "../../../../redux/actions/providerActions";
import UploadPhoto from "../../../Common/UploadFotoBlock/UploadPhoto";

let mainFile = null;

const ChangeProviderForm = ({error, handleSubmit, name, email, phone}) => {
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
                <Field component="input" className={style.input} name="phone" placeholder={phone} />
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

const ChangeReduxForm = reduxForm({ form: "change" })(ChangeProviderForm);

const ChangeForm = ({handleClick, name, phone, email, providerEdit}) => {
    const handleSubmit = async (formData) => {
        const dataToChange = {};
        if (formData.name !== undefined) {
            dataToChange.name = formData.name;
        }
        if (formData.email !== undefined) {
            dataToChange.email = formData.email;
        }
        if (formData.phone !== undefined) {
            dataToChange.phone = formData.phone;
        }
        if (formData.password !== undefined) {
            dataToChange.password = formData.password;
        }
        if (mainFile !== null) {
            dataToChange.avatar = mainFile;
        }
        const editResponse = await providerEdit(dataToChange);
        if (editResponse === 'ok') {
            handleClick();
            return;
        }
        if (editResponse === 'non-unique data') {
            throw new SubmissionError({_error: 'Партнёр с такими данными уже зарегистрирован'});
        }
        throw new SubmissionError({_error: 'Что-то пошло не так...'});
    };

    return (
        <div>
            <ChangeReduxForm onSubmit={handleSubmit} name={name} phone={phone} email={email}/>
        </div>
    );
};

export default connect(null, { providerEdit })(ChangeForm);