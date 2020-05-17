import React, { useState } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import style from "./ChangeUserInfoForm.module.css";
import UploadPhoto from "../../../../Common/UploadFotoBlock/UploadPhoto";
import { userEdit } from "../../../../../redux/actions/userActions";

let mainFile = null;

const ChangeUserInfoForm = ({handleSubmit, name, metro}) => {
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
            <div>
                <Field component={UploadPhoto} name="Photo" uploadImage={uploadImage} deleteUrl={deleteUrl} url={url} />
            </div>
            <button className={style.saveButton} type='submit'>
                Сохранить
            </button>
        </form>
    );
};

const ChangeReduxForm = reduxForm({ form: "change" })(ChangeUserInfoForm);

const ChangeForm = ({handleClick, name, userEdit}) => {
    const handleSubmit = async (formData) => {
        const dataToChange = {};
        if (formData.name !== undefined) {
            dataToChange.name = formData.name;
        }
        if (mainFile !== null) {
            dataToChange.avatar = mainFile;
        }
        await userEdit(dataToChange);
        handleClick();
    };

    return (
        <div>
            <ChangeReduxForm onSubmit={handleSubmit} name={name}/>
        </div>
    );
};

export default connect(null, { userEdit })(ChangeForm);