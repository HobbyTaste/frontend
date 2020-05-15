import React, { useState } from 'react';
import { connect } from 'react-redux';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import Link from '@material-ui/core/Link';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { addNewHobby } from '../../redux/actions/providerActions';
import style from './AddHobby.module.css';

const helpText = ['',
    'Почтовый адрес здания, в котором располагается хобби: улица и номер дома',
    'Распишите всё, что может помочь найти местоположение Вашего хобби: адрес, этаж, проход, ориентиры на местности',
    'Здесь вы можете написать про душевые, раздевалки, полотенца и другие приятные мелочи, которыми Вы обеспечиваете посетителей',
    'Опишите условия, которые бы Вы хотел подчеркнуть: например, то, что Ваше хобби ведёт набор до определённого числа или принимает лиц одного пола'];

const EditHobbyForm = (props) => {
    const [state, setState] = useState({
        showHelp: 0,
        Parking: false,
        Beginners: false,
        Kids: false,
        Equipment: false,
        Disabled: 0,
    });

    const [organization, setOrganization] = useState(props.organization);
    const [image, setImage] = useState(props.image);
    const [file, setFile] = useState(null);
    const [metro, setMetro] = useState(props.metro);
    const [shortAddress, setShortAddress] = useState(props.shortAddress);
    const [fullAddress, setFullAddress] = useState(props.fullAddress);
    const [information, setInformation] = useState(props.information);
    const [facilities, setFacilities] = useState(props.facilities);
    const [special, setSpecial] = useState(props.special);
    const [telephone, setTelephone] = useState(props.telephone);
    const [email, setEmail] = useState(props.email);
    const [website, setWebsite] = useState(props.website);
    const [vk, setVk] = useState(props.vk);
    const [instagram, setInstagram] = useState(props.instagram);
    const [facebook, setFacebook] = useState(props.facebook);
    const [exactDates, setExactDates] = useState(props.exactDates);
    const [price, setPrice] = useState(props.price);

    const [parking, setParking] = useState(props.parking);
    const [beginner, setBeginner] = useState(props.beginner);
    const [kids, setKids] = useState(props.kids);
    const [equipment, setEquipment] = useState(props.equipment);

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
    const onExDatChange = (e) => {
        setExactDates(e.target.value);
    };
    const onPriceChange = (e) => {
        setPrice(e.target.value);
    };

    const onParkingChange = (val) => {
        setState({
            Parking: false,
        });
        setParking(val);
    };
    const onBeginnerChange = (val) => {
        setState({
            Beginners: false,
        });
        setBeginner(val);
    };
    const onKidsChange = (val) => {
        setState({
            Kids: false,
        });
        setKids(val);
    };
    const onEquipmentChange = (val) => {
        setState({
            Equipment: false,
        });
        setEquipment(val);
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
        setOrganization(props.organization);
        setImage(props.image);
        setFile(null);
        setMetro(props.metro);
        setShortAddress(props.shortAddress);
        setFullAddress(props.fullAddress);
        setInformation(props.information);
        setFacilities(props.facilities);
        setSpecial(props.special);
        setTelephone(props.telephone);
        setEmail(props.email);
        setWebsite(props.website);
        setVk(props.vk);
        setInstagram(props.instagram);
        setFacebook(props.facebook);
        setExactDates(props.exactDates);
        setPrice(props.price);

        setParking(props.parking);
        setBeginner(props.beginner);
        setKids(props.kids);
        setEquipment(props.equipment);
    };

    const onSubmit = () => {
        props.addNewHobby(organization, metro,
            shortAddress, fullAddress,
            information, facilities, special,
            telephone, email, website, vk, instagram, facebook,
            exactDates, price,
            parking, beginner, kids, equipment,
            props.id, file);
        props.handleClose();
    };

    const avatar = 'https://images.assetsdelivery.com/compings_v2/jenjawin/jenjawin1904/jenjawin190400208.jpg';

    const showParking = (e) => {
        setState({
            Parking: !state.Parking,
        });
    };
    const showBeginners = (e) => {
        setState({
            Beginners: !state.Beginners,
        });
    };
    const showKids = (e) => {
        setState({
            Kids: !state.Kids,
        });
    };
    const showEquipment = (e) => {
        setState({
            Equipment: !state.Equipment,
        });
    };

    const tagValueToText = (val) => {
        if (val === true) return 'Да';
        if (val === false) return 'Нет';
        return 'Не указано';
    };

    const Help = (value) => {
        setState({
            showHelp: value,
        });
    };

    const handleCheckbox = (value) => {
        setState({
            Disabled: value,
        });
    };

    const help = (helpSection) => (<div style={{ display: 'block' }}>
        <div className={style.helpIcon} onMouseOver={() => Help(helpSection)} onMouseOut={() => Help(0)}>
            <HelpOutlineOutlinedIcon/>
        </div>
        <div className={style.help}
            style={{
                display: `${(state.showHelp === helpSection) ? 'block' : 'none'}`,
                margin: `${(helpSection % 2 === 0) ? '58px 100px 0 25px' : '3px 100px 0 25px'}`,
            }}>
            {helpText[helpSection]}
        </div>
    </div>
    );

    const weekDay = (day) => (
        <div className={style.weekDayContainer}>
            {day}:
            <span className={style.weekTimeContainer}>
                <input className={style.smallInput} disabled={state.Disabled}/>
            </span>
            <span className={style.weekTimeContainer}>
                <input className={style.smallInput} disabled={state.Disabled}/>
            </span>
        </div>
    );

    const chooseTag = (tagState, showTag, changeTag, listState) => (
        <span>
            <span className={style.chooseButton}>
                {tagValueToText(tagState)}
                <span className={style.dropdownIcon} onClick={showTag}>
                    <ArrowDropDownIcon/>
                </span>
            </span>
            <div className={style.list} style={{ display: `${listState ? 'block' : 'none'}` }}>
                <div className={style.listItem}
                    onClick={(e) => changeTag(null)}>Не указано</div>
                <div className={style.listItem}
                    onClick={(e) => changeTag(true)}>Да</div>
                <div className={style.listItem}
                    onClick={(e) => changeTag(false)}>Нет</div>
            </div>
        </span>);

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
                <span style={{ margin: '203px 0 0 20px', display: 'block' }}>
                    {help(1)}
                    {help(2)}
                </span>
            </div>

            <div className={style.upperContainer}>
                <div className={style.infoContainer}>
                    <input className={style.input} name='facilities' onChange={onFacilitiesChange} value={facilities}
                        placeholder={'Удобства'}/>
                    <input className={style.input} name='special' onChange={onSpecialChange} value={special}
                        placeholder={'Особые условия'}/>
                    <textarea className={style.input} name='info' onChange={onInfoChange} value={information}
                        placeholder={'Описание'} style={{ height: '97px', padding: '5px 0 0 9px' }}/>
                </div>
                <span style={{ margin: '15px 0 0 20px', display: 'block' }}>
                    {help(3)}
                    {help(4)}
                </span>
            </div>

            <div className={style.upperContainer}>
                <span className={style.timeContainer}>
                    <div className={style.header}>Время работы:</div>
                    {weekDay('пн')}
                    {weekDay('вт')}
                    {weekDay('ср')}
                    {weekDay('чт')}
                    {weekDay('пт')}
                    {weekDay('сб')}
                    {weekDay('вс')}
                </span>
                <span className={style.priceContainer}>
                    <div style={{ display: 'flex' }}>
                        <input type="checkbox" onClick={ () => handleCheckbox(!state.Disabled) }/>
                        <span className={style.smallHeader}>Только в определённые даты</span>
                    </div>
                    <input className={style.input} style={{ margin: '10px 0 20px 20px' }}
                        name='exactDates' onChange={onExDatChange} value={exactDates}
                        placeholder={'Введите даты'} disabled={!state.Disabled}/>
                    <div className={style.header}>Цены:</div>
                    <textarea className={style.input}
                        style={{ margin: '2px 0 4px 20px', height: '115px', padding: '5px 0 0 9px' }}
                        name='price' onChange={onPriceChange} value={price}
                        placeholder={'Цены'}/>
                </span>
            </div>

            <div className={style.upperContainer} style={{ width: '753px' }}>
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

            <div className={style.tagUpperContainer}>
                <span className={style.header} style={{ margin: '10px 20px 0 0' }}>Метки:</span>
                <span className={style.tagContainer}>
                    <div className={style.chooseTag}>
                        Есть ли рядом с Вашим хобби парковка для гостей?
                        {chooseTag(parking, showParking, onParkingChange, state.Parking)}
                    </div>
                    <div className={style.chooseTag}>
                        Предназначено ли Ваше хобби для детей?
                        {chooseTag(kids, showKids, onKidsChange, state.Kids)}
                    </div>
                    <div className={style.chooseTag}>
                        Предназначено ли ваше хобби для новичков?
                        {chooseTag(beginner, showBeginners, onBeginnerChange, state.Beginners)}
                    </div>
                    <div className={style.chooseTag}>
                        Предоставляете ли Вы необходимую экипировку?
                        {chooseTag(equipment, showEquipment, onEquipmentChange, state.Equipment)}
                    </div>
                </span>
            </div>

            <div style={{ display: 'block', width: '768px' }}>
                <button className={style.deleteButton} onClick={resetForm}>
                    <Link to='/provider/cabinet/own' className={style.deleteLink}
                        style={{ color: '#034488' }}>Удалить хобби</Link>
                    <DeleteIcon className={style.trashIcon}/>
                </button>
                <button className={style.button} onSubmit={onSubmit}>Сохранить</button>
                <button className={style.button} onClick={resetForm}>Отмена</button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    id: state.providerCabinet.id,
});

export default connect(mapStateToProps, { addNewHobby })(EditHobbyForm);
