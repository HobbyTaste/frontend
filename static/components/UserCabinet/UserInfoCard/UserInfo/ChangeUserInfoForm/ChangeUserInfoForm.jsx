import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Input } from '../../../../Common/FormsControls/FormsControls';
import style from './ChangeUserInfoForm.module.css';
import { RedButton } from '../../../../Common/MaterialsButtons';
import UploadPhoto from '../../../../Common/UploadFotoBlock/UploadPhoto';
import { userEdit } from '../../../../../redux/reducers/auth-reducer';

let mainFile = null;
const ChangeUserInfoForm = ({ handleSubmit, name, metro, error }) => {
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

    // handleInputChange(event) {
    //     const target = event.target;
    //     const value = target.name === 'isGoing' ? target.checked : target.value;
    //     const name = target.name;
    //
    //     this.setState({
    //         [name]: value
    //     });
    // }

    return (
        <form onSubmit={handleSubmit}>
            <div className={style.inputContainer}>
                <input className={style.input} name='Name' value={name}/>
                <br/><input className={style.input} name='Metro' value={metro}/>
            </div>
            <div>
                <UploadPhoto uploadImage={uploadImage} deleteUrl={deleteUrl} url={url}/>
            </div>
            {/*<div className={style.saveButton}>*/}
            {/*    <RedButton text={'Сохранить'} label="Submit" onSubmit={handleSubmit} />*/}
            {/*</div>*/}
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
        if (formData.metro !== undefined) {
            dataToChange.metro = formData.metro;
        }
        if (mainFile !== null) {
            dataToChange.avatar = mainFile;
        }
        props.userEdit(dataToChange);
    };
    return (
        <div>
            <ChangeReduxForm onSubmit={onSubmit} name={props.name} metro={props.metro} />
        </div>
    );
};

export default connect(null, { userEdit })(ChangeForm);
