import React, { useState } from 'react';
import { connect } from 'react-redux';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import style from './AddHobby.module.css';
import { addNewHobby } from '../../redux/actions/providerActions';
import { defaultHobbyProps } from '../../utils/constant';
import { Redirect } from 'react-router-dom';

const helpText = ['',
    'Почтовый адрес здания, в котором располагается хобби: улица и номер дома',
    'Распишите всё, что может помочь найти местоположение Вашего хобби: адрес, этаж, проход, ориентиры на местности',
    'Здесь вы можете написать про душевые, раздевалки, полотенца и другие приятные мелочи, которыми Вы обеспечиваете посетителей',
    'Опишите условия, которые бы Вы хотели подчеркнуть: например, то, что Ваше хобби ведёт набор до определённого числа или принимает лиц одного пола',
    'Это большая надпись, которая будет располагаться напротив названия в списке хобби. Здесь можно указать, например, цену самого популярного варианта. Пример: "500", "Бесплатно"',
    'Это пояснение, располагающееся под основной надписью. Здесь можно указать, например, что основная надпись означает. Пример: "за занятие", "за неделю".'
];

const initialWorkTime = {
    "пн": {0: "", 1: ""},
    "вт": {0: "", 1: ""},
    "ср": {0: "", 1: ""},
    "чт": {0: "", 1: ""},
    "пт": {0: "", 1: ""},
    "сб": {0: "", 1: ""},
    "вс": {0: "", 1: ""},
}

const AddHobbyForm = (props) => {
    const [state, setState] = useState({
        showHelp: 0,
        Parking: false,
        Beginners: false,
        Kids: false,
        Equipment: false,
        Disabled: 0,
    });

    const [label, setLabel] = useState('');
    const [image, setImage] = useState('');
    const [file, setFile] = useState(null);
    const [metro, setMetro] = useState('');
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [facilities, setFacilities] = useState('');
    const [special, setSpecial] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [vk, setVk] = useState('');
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');
    const [exactDates, setExactDates] = useState('');
    const [price, setPrice] = useState({title: '', priceList: ''});
    const [category, setCategory] = useState('');
    const [workTime, setWorkTime] = useState(initialWorkTime)

    const [parking, setParking] = useState(null);
    const [beginner, setBeginner] = useState(null);
    const [kids, setKids] = useState(null);
    const [equipment, setEquipment] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const onLabelChange = (e) => {
        setLabel(e.target.value);
    };
    const onMetroChange = (e) => {
        setMetro(e.target.value);
    };
    const onAddressChange = (e) => {
        setAddress(e.target.value);
    };
    const onLocationChange = (e) => {
        setLocation(e.target.value);
    };
    const onInfoChange = (e) => {
        setDescription(e.target.value);
    };
    const onFacilitiesChange = (e) => {
        setFacilities(e.target.value);
    };
    const onSpecialChange = (e) => {
        setSpecial(e.target.value);
    };
    const onTelChange = (e) => {
        setPhone(e.target.value);
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
    const onPriceTitleChange = (e) => {
        setPrice({title: e.target.value, priceList: price.priceList});
    };
    const onPriceListChange = (e) => {
        setPrice({title: price.title, priceList: e.target.value});
    };
    const onCategoryChange = (e) => {
        setCategory(e.target.value);
    };
    const onDaysChange = (e) => {
        e.persist();
        let [day, number] = e.target.id.split('+');
        number = Number(number);
        setWorkTime(workTime => {
            return {...workTime, [day]: {[number]: e.target.value, [1 - number]: workTime[day][1 - number]}};
        });
    }


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
        setLabel('');
        setMetro('');
        setAddress('');
        setLocation('');
        setDescription('');
        setFacilities('');
        setSpecial('');
        setPhone('');
        setEmail('');
        setWebsite('');
        setVk('');
        setInstagram('');
        setFacebook('');
        setExactDates('');
        setPrice('');
        setImage('');
        setFile(null);
        setParking(null);
        setBeginner(null);
        setKids(null);
        setEquipment(null);
    };

    const onSubmit = async () => {
        const prettyWorkTime = [];
        for (let day in workTime) {
            if (workTime[day][0] || workTime[day][1])
            prettyWorkTime.push(`${day} ${workTime[day][0]} — ${workTime[day][1]} \n`);
        }
        const newHobby = {label, metroStation: metro,
            address, location, category,
            description, facilities, special,
            phone, email, website, contacts: JSON.stringify({vk, instagram, facebook}),
            workTime: JSON.stringify(prettyWorkTime.concat([exactDates])), price: JSON.stringify({title: price.title, priceList: price.priceList}),
            parking: Boolean(parking), novice: Boolean(beginner), children: Boolean(kids), equipment: Boolean(equipment), avatar: file
        }
        const requestResult = await props.addNewHobby(newHobby);
        if (!requestResult) {
            setSubmitted(true);
        }
    };

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

    if (submitted) return <Redirect to="/provider/cabinet/own"/>

    const help = (helpSection) => (<div style={{ display: 'block', position: 'relative' }}>
        <div className={style.helpIcon} onMouseOver={() => Help(helpSection)} onMouseOut={() => Help(0)}>
            <HelpOutlineOutlinedIcon/>
        </div>
        <div className={style.help}
            style={{
                display: `${(state.showHelp === helpSection) ? 'block' : 'none'}`,
                margin: `${(helpSection % 2 === 0) ? '53px 100px 0 25px' : '3px 100px 0 25px'}`,
            }}>
            {helpText[helpSection]}
        </div>
    </div>
    );

    const weekDay = (day) => (
        <div className={style.weekDayContainer}>
            {day}:
            <span className={style.weekTimeContainer}>
                <input className={style.smallInput} disabled={state.Disabled} id={`${day}+0`} onChange={onDaysChange} value={workTime[day][0]}/>
            </span>
            <span className={style.weekTimeContainer}>
                <input className={style.smallInput} disabled={state.Disabled} id={`${day}+1`} onChange={onDaysChange} value={workTime[day][1]}/>
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
                            style={{ backgroundImage: `url("${image || defaultHobbyProps.imageUrl}")` }}>
                        </div>
                    </div>
                </span>
                <span className={style.halfContainer}>
                    <div className={style.header}>Общая информация о хобби:</div>
                    <input className={style.input} name='label' onChange={onLabelChange} value={label}
                        placeholder={'Название хобби'} autoFocus={true}/>
                    <div>
                        <input style={{ margin: '10px 0' }} type="file" name="file" id="file" onChange={uploadImage}
                            placeholder={'Фото'}/>
                        <select required style={{ marginBottom: "4px"}} onChange={onCategoryChange}>
                            <option defaultValue value="other">Категория</option>
                            <option value="sport">Спорт</option>
                            <option value="music">Музыка</option>
                            <option value="creativity">Творчество</option>
                            <option value="art">Рисование</option>
                            <option value="sport_game">Игровые виды спорта</option>
                            <option value="sport_wrestling">Единоборства</option>
                            <option value="sport_winter">Зимние виды спорта</option>
                            <option value="dance">Танцы</option>
                            <option value="other">Другое</option>
                        </select>
                    </div>
                    <input className={style.input} name='metro' onChange={onMetroChange} value={metro}
                        placeholder={'Станция метро*'}/>
                    <input className={style.input} name='address' onChange={onAddressChange} value={address}
                        placeholder={'Краткий адрес*'}/>
                    <textarea className={style.input} name='location' onChange={onLocationChange} value={location}
                        placeholder={'Полный адрес*'} style={{ height: '58px', padding: '5px 0 0 9px' }}/>

                </span>
                <span style={{ margin: '190px 0 0 20px', display: 'block' }}>
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
                    <textarea className={style.input} name='info' onChange={onInfoChange} value={description}
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
                    <input className={style.input} style={{ margin: '2px 0 4px 20px' }} name='price.title'
                        onChange={onPriceTitleChange} value={price.title}
                        placeholder={'Заголовок'}/>
                    <textarea className={style.input}
                        style={{ margin: '2px 0 4px 20px', padding: '5px 0 0 9px', height:"70px" }}
                        name='price' onChange={onPriceListChange} value={price.priceList}
                        placeholder={'Опции*'}/>
                </span>
                <span style={{ margin: '140px 0 0 40px', display: 'block' }}>
                    {help(5)}
                    {help(6)}
                </span>
            </div>

            <div className={style.upperContainer} style={{ width: '753px' }}>
                <span className={style.header} style={{ margin: '10px 0 0 0' }}>Контакты:</span>
                <span className={style.contactContainer}>
                    <input className={style.input} name='phone' onChange={onTelChange} value={phone}
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
                <button className={style.button} onClick={onSubmit}>Сохранить</button>
                <button className={style.button} onClick={resetForm}>Отмена</button>
            </div>
        </div>
    );
};


export default connect(null, { addNewHobby })(AddHobbyForm);
