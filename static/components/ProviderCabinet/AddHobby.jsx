import React, { useState } from 'react';
import { connect } from 'react-redux';
import style from './AddHobby.module.css';
import { addNewHobby } from '../../redux/actions/providerActions';

const AddHobbyForm = (props) => {
    const [organization, setOrganization] = useState('');
    const [image, setImage] = useState('');
    const [file, setFile] = useState(null);
    const [metro, setMetro] = useState('');
    const [shortAddress, setShortAddress] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [information, setInformation] = useState('');
    const [facilities, setFacilities] = useState('');
    const [special, setSpecial] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [vk, setVk] = useState('');
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');

    const onOrganizationChange = (e) => {
        setOrganization(e.target.value);
    };
    const onMetroChange = (e) => {
        setMetro(e.target.value);
    };
    const onShortAddressChange = (e) => {
        setShortAddress(e.target.value);
    };
    const onFullAddressChange = (e) => {
        setFullAddress(e.target.value);
    };
    const onInfoChange = (e) => {
        setInformation(e.target.value);
    };
    const onFacilitiesChange = (e) => {
        setFacilities(e.target.value);
    };
    const onSpecialChange = (e) => {
        setSpecial(e.target.value);
    };
    const onTelChange = (e) => {
        setTelephone(e.target.value);
    };
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const onWebChange = (e) => {
        setWebsite(e.target.value);
    };
    const onVkChange = (e) => {
        setVk(e.target.value);
    };
    const onInstaChange = (e) => {
        setInstagram(e.target.value);
    };
    const onFbChange = (e) => {
        setFacebook(e.target.value);
    };
    const uploadImage = (e) => {
        const reader = new FileReader();
        const photoFile = e.target.files[0];
        reader.onloadend = () => {
            setImage(`${reader.result}`);
            setFile(photoFile);
        };
        reader.readAsDataURL(photoFile);
    };
    const resetForm = () => {
        setOrganization('');
        setMetro('');
        setShortAddress('');
        setFullAddress('');
        setInformation('');
        setFacilities('');
        setSpecial('');
        setTelephone('');
        setEmail('');
        setWebsite('');
        setVk('');
        setInstagram('');
        setFacebook('');
        setImage('');
        setFile(null);
    };

    const onSubmit = () => {
        props.addNewHobby(organization, metro,
            shortAddress, fullAddress,
            information, facilities, special,
            telephone, email, website, vk, instagram, facebook,
            props.id, file);
        props.handleClose();
    };

    const avatar = 'https://images.assetsdelivery.com/compings_v2/jenjawin/jenjawin1904/jenjawin190400208.jpg';

    return (
        <div className={style.background}>
            <div className={style.upperContainer}>
                <span className={style.avatar}>
                    <div className={style.imgContainer}>
                        <div className={style.img}
                            style={{ backgroundImage: `url("${avatar}")` }}>
                        </div>
                    </div>
                </span>
                <span className={style.halfContainer}>
                    <div className={style.header}>Общая информация о хобби:</div>
                    <input className={style.input} name='organization' onChange={onOrganizationChange} value={organization}
                        placeholder={'Название хобби'} autoFocus={true}/>
                    <input style={{ margin: '10px 0' }} type="file" name="file" id="file" onChange={uploadImage}
                        placeholder={'Фото'}/>
                    <input className={style.input} name='metro' onChange={onMetroChange} value={metro}
                        placeholder={'Станция метро*'}/>
                    <input className={style.input} name='shortAddress' onChange={onShortAddressChange} value={shortAddress}
                        placeholder={'Краткий адрес*'}/>
                    <textarea className={style.input} name='fullAddress' onChange={onFullAddressChange} value={fullAddress}
                        placeholder={'Полный адрес*'} style={{ height: '58px', padding: '5px 0 0 9px' }}/>
                </span>
            </div>

            <div className={style.infoContainer}>
                <input className={style.input} name='facilities' onChange={onFacilitiesChange} value={facilities}
                    placeholder={'Удобства'}/>
                <input className={style.input} name='special' onChange={onSpecialChange} value={special}
                    placeholder={'Особые условия'}/>
                <textarea className={style.input} name='info' onChange={onInfoChange} value={information}
                    placeholder={'Описание'} style={{ height: '97px', padding: '5px 0 0 9px' }}/>
            </div>

            <div className={style.upperContainer}>
                <span className={style.header} style={{ margin: '10px 0 0 0' }}>Контакты:</span>
                <span className={style.contactContainer}>
                    <input className={style.input} name='telephone' onChange={onTelChange} value={telephone}
                        placeholder={'Телефон*'} type="telephone"/>
                    <input className={style.input} name='email' onChange={onEmailChange} value={email}
                        placeholder={'Email*'} type="email"/>
                    <input className={style.input} name='website' onChange={onWebChange} value={website}
                        placeholder={'Официальный сайт хобби'}/>
                </span>
                <span className={style.contactContainer}>
                    <input className={style.input} name='vk' onChange={onVkChange} value={vk}
                        placeholder={'VK'}/>
                    <input className={style.input} name='instagram' onChange={onInstaChange} value={instagram}
                        placeholder={'Instagram'}/>
                    <input className={style.input} name='facebook' onChange={onFbChange} value={facebook}
                        placeholder={'Facebook'}/>
                </span>
            </div>
            <div className={style.upperContainer} style={{ display: 'block' }}>
                <button className={style.button} onSubmit={onSubmit}>Сохранить</button>
                <button className={style.button} onClick={resetForm}>Отмена</button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    id: state.providerCabinet.providerId,
});

export default connect(mapStateToProps, { addNewHobby })(AddHobbyForm);
