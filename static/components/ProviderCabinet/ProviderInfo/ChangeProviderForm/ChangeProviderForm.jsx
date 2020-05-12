import React, { useState } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import style from './ChangeProviderForm.module.css';
import UploadPhoto from '../../../Common/UploadFotoBlock/UploadPhoto';
import { userEdit } from '../../../../redux/actions/userActions';

let mainFile = null;
const ChangeProviderForm = ({ handleSubmit, name, error }) => {
    const [url, setUrl] = useState('');
    const [file, setFile] = useState(null);
    const [state, setState] = useState({
        Name: name,
    });
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
    const handleInputChange = (event) => {
        setState({
            [event.target.name]: event.target.text,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={style.inputContainer}>
                <input className={style.input} name='Name' value={state.Name} onChange={handleInputChange}/>
            </div>
            <div>
                <UploadPhoto uploadImage={uploadImage} deleteUrl={deleteUrl} url={url}/>
            </div>
            <button className={style.saveButton} onClick={handleSubmit}>Сохранить</button>
        </form>
    );
};

const ChangeReduxForm = reduxForm({ form: 'change' })(ChangeProviderForm);

const ChangeForm = (props) => {
    const onSubmit = (formData) => {
        const dataToChange = {};
        if (formData.name !== undefined) {
            dataToChange.name = formData.name;
        }
        if (mainFile !== null) {
            dataToChange.avatar = mainFile;
        }
        props.userEdit(dataToChange);
        props.handleClick();
    };
    return (
        <div>
            <ChangeReduxForm onSubmit={onSubmit} name={props.name} metro={props.metro} />
        </div>
    );
};

export default connect(null, { userEdit })(ChangeForm);
