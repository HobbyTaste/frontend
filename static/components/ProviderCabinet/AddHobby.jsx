import React, {useState} from 'react';
import {Input} from "./FormsControlsAddHobby/FormsControls";
import {CommonButton} from "../Common/CommonButton";
import style from "./AddHobby.module.css";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {AddHobbyCard} from './AddHobbyCard/AddHobbyCard'
import {addNewHobby} from "../../redux/reducers/provider-reducer";
import {connect} from "react-redux";

const AddHobbyForm = (props) => {
    let [organization, setOrganization] = useState('');
    let [telephone, setTelephone] = useState('');
    let [email, setEmail] = useState('');
    let [metro, setMetro] = useState('');
    let [address, setAddress] = useState('');
    let [information, setInformation] = useState('');
    let [image, setImage] = useState('');
    let [file, setFile] = useState(null);

    let onOrganizationChange = (e) => {
        setOrganization(e.target.value);
    };
    let onTelChange = (e) => {
        setTelephone(e.target.value);
    };
    let onEmailChange = (e) => {
        setEmail(e.target.value);
    };
    let onMetroChange = (e) => {
        setMetro(e.target.value);
    };
    let onAddressChange = (e) => {
        setAddress(e.target.value);
    };
    let onInfoChange = (e) => {
        setInformation(e.target.value);
    };
    let uploadImage = (e) => {
        let reader = new FileReader();
        let photo_file = e.target.files[0];
        reader.onloadend = () => {
            setImage(`${reader.result}`);
            setFile(photo_file);
        };
        reader.readAsDataURL(photo_file)
    };
    let resetForm = () => {
        setOrganization('');
        setTelephone('');
        setEmail('');
        setMetro('');
        setAddress('');
        setInformation('');
        setImage('');
        setFile(null);
    };

    const onSubmit = () => {
        props.addNewHobby(organization, telephone, email,
            address, metro, information, props.id, file);
        props.handleClose();
    };
    return(
        <div>
            <div className={style.pageContent}>
                <div className={style.formContainer}>
                    <div className={style.hobbyFormContainer}>
                    <h1>Заполните форму о вашем хобби</h1>
                    <form action="#" className={style.form}>
                        <Input name='organization' onChange={onOrganizationChange} value={organization}
                               placeholder={"Название организации"} autoFocus={true}/>
                        <Input name='telephone' onChange={onTelChange} value={telephone} placeholder={"Телефон *"} type="telephone"/>
                        <Input name='email' onChange={onEmailChange} value={email} placeholder={"Email *"} type="email"/>
                        <Input name='address' onChange={onAddressChange} value={address} placeholder={"Точный адресс *"}/>
                        <Input name='metro' onChange={onMetroChange} value={metro} placeholder={"Станция метро *"}/>
                        <Input name='info' onChange={onInfoChange} value={information} placeholder={"Краткая информация о хобби *"}/>
                    </form>
                    <label htmlFor="file">
                        <CloudUploadIcon className={style.upload} style={{ fontSize: 80 }} />
                    </label>
                    <input type="file" name="file" id="file" onChange={uploadImage} className={style.input}/>
                    <div>Загрузить фото</div>
                        </div>
                </div>
                <div className={style.formContainer}>
                    <AddHobbyCard organization={organization} telephone={telephone}
                                  email={email} metro={metro}
                                  address={address} information={information}
                                  image={image}/>
                    <div className={style.buttonsContainer}>
                            <CommonButton text="ДОБАВИТЬ" onSubmit={onSubmit}/>
                        <div onClick={resetForm}>
                        <CommonButton text="СБРОСИТЬ"/>
                        </div>
                    </div>
                    </div>
                    </div>
                    </div>
    );
};

const mapStateToProps = (state) => {
    return {
        id: state.providerCabinet.providerId
    }
};

export default connect(mapStateToProps, {addNewHobby})(AddHobbyForm);