import React, { Component, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { initializeProviderCabinet } from '../../../redux/actions/providerActions';
import style from './ProviderMonetization.module.css';

const defaultImage = 'https://kravmaganewcastle.com.au/wp-content/uploads/2017/04/default-image-800x600.jpg';

const useStyles = makeStyles({
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
        margin: '5px',
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
    },
    checkedIcon: {
        backgroundColor: '#178FD6',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#178FD6',
        },
    },
});

function StyledRadio(props) {
    const classes = useStyles();

    return (
        <Radio
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={<span className={`${classes.icon} ${classes.checkedIcon}`} />}
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}

const ProviderMonetization = (props) => {
    useEffect(() => {
        props.initializeProviderCabinet();
    }, []);

    const [state, setState] = useState({
        showHelp: 0,
        Hobby: null,
        Widget: null,
        Top: null,
        Poster: null,
        Pay: null,
        disabled: true,
    });

    // if (!props.isAuth) {
    //    return <Redirect to={'/'} />;
    // }

    const handleChange = (event) => {
        setState({
            [event.target.name]: event.target.value,
        });
        if (state.Pay !== null) setState({ disabled: false });
    };

    const Help = (value) => {
        setState({
            showHelp: value,
        });
    };

    return (<div className={style.background}>
        <div className={style.hobbyContainer}>
            <span className={style.header}>Выберите хобби:</span>
            <button className={style.hobbyList}>
                Список хобби партнёра
                <span className={style.dropdownIcon}><ArrowDropDownIcon/></span>
            </button>
        </div>
        <div className={style.header}>Выберите тип монетизации:</div>
        <div className={style.monetizationContainer}>
            <span className={style.monetization}>
                <div className={style.nameContainer}>
                    <span className={style.name}>Топ поиска</span>
                    <span className={style.helpIcon} onMouseOver={() => Help(1)} onMouseOut={() => Help(0)}>
                        <HelpOutlineOutlinedIcon/>
                    </span>
                </div>
                <div className={style.help} style={{ display: `${(state.showHelp === 1) ? 'block' : 'none'}` }}>
                        Ваше объявление имеет преимущество в ранжировании и находится
                        на первых местах при поиске в категории хобби.
                </div>
                <div className={style.centringContainer}>
                    <div className={style.img}
                        style={{ backgroundImage: `url("${defaultImage}")` }}/>
                </div>
                <FormControl component="fieldset">
                    <div className={style.time}>Продолжительность:</div>
                    <RadioGroup aria-label="time" name="Top" onChange={handleChange}>
                        <FormControlLabel value='short' control={<StyledRadio/>} label="7 дней" />
                        <FormControlLabel value='middle' control={<StyledRadio/>} label="14 дней" />
                        <FormControlLabel value='long' control={<StyledRadio/>} label="30 дней" />
                    </RadioGroup>
                </FormControl>
            </span>
            <span className={style.monetization}>
                <div className={style.nameContainer}>
                    <span className={style.name}>Виджет</span>
                    <span className={style.helpIcon} onMouseOver={() => Help(2)} onMouseOut={() => Help(0)}>
                        <HelpOutlineOutlinedIcon/>
                    </span>
                </div>
                <div className={style.help} style={{ display: `${(state.showHelp === 2) ? 'block' : 'none'}` }}>
                        Ваше объявление размещается в виджете главной странице.
                        Находится по центру и привлекает внимание.
                </div>
                <div className={style.centringContainer}>
                    <div className={style.img}
                        style={{ backgroundImage: `url("${defaultImage}")` }}/>
                </div>
                <FormControl component="fieldset">
                    <div className={style.time}>Продолжительность:</div>
                    <RadioGroup aria-label="time" name="Widget" onChange={handleChange}>
                        <FormControlLabel value='short' control={<StyledRadio/>} label="7 дней" />
                        <FormControlLabel value='middle' control={<StyledRadio/>} label="14 дней" />
                        <FormControlLabel value='long' control={<StyledRadio/>} label="30 дней" />
                    </RadioGroup>
                </FormControl>
            </span>
            <span className={style.monetization}>
                <div className={style.nameContainer}>
                    <span className={style.name}>Афиша</span>
                    <span className={style.helpIcon} onMouseOver={() => Help(3)} onMouseOut={() => Help(0)}>
                        <HelpOutlineOutlinedIcon/>
                    </span>
                </div>
                <div className={style.help} style={{ display: `${(state.showHelp === 3) ? 'block' : 'none'}` }}>
                        Ваше объявление размещается на специальной афише слева от основной страницы.
                        Она не смещается при перемотке и всегда видна.
                </div>
                <div className={style.centringContainer}>
                    <div className={style.img}
                        style={{ backgroundImage: `url("${defaultImage}")` }}/>
                </div>
                <FormControl component="fieldset">
                    <div className={style.time}>Продолжительность:</div>
                    <RadioGroup aria-label="time" name="Poster" onChange={handleChange}>
                        <FormControlLabel value='short' control={<StyledRadio/>} label="7 дней" />
                        <FormControlLabel value='middle' control={<StyledRadio/>} label="14 дней" />
                        <FormControlLabel value='long' control={<StyledRadio/>} label="30 дней" />
                    </RadioGroup>
                </FormControl>
            </span>
        </div>
        <div className={style.explanation}>Вы можете выбрать один или несколько способов монетизации</div>
        <div className={style.paymentContainer}>
            <span className={style.header}>Оплатить:</span>
            <FormControl component="fieldset">
                <RadioGroup aria-label="time" name="Poster" onChange={handleChange}>
                    <FormControlLabel value='card' control={<StyledRadio/>} label="Карта Visa/MasterCard" />
                    <FormControlLabel value='online' control={<StyledRadio/>} label="Сбербанк Онлайн" />
                    <FormControlLabel value='debt' control={<StyledRadio/>} label="В долг :)" />
                </RadioGroup>
            </FormControl>
        </div>
        <button className={style.payButton} disabled={state.disabled}>Оплатить</button>
    </div>);
};

const mapStateToProps = (state) => ({
    // providerIsAuth: state.providerCabinet.providerIsAuth,
    providerIsAuth: true,
    // name: state.providerCabinet.name,
    email: state.providerCabinet.email,
    phone: state.providerCabinet.phone,
    info: state.providerCabinet.info,
    // avatar: state.providerCabinet.avatar,
    password: state.providerCabinet.password,
    providerInitialized: state.providerCabinet.providerInitialized,
    providerHobbies: state.providerCabinet.providerHobbies,

    name: 'Контора "Рога и копыта"',
    avatar: 'https://kravmaganewcastle.com.au/wp-content/uploads/2017/04/default-image-800x600.jpg',
});

// maybe need own initializer
export default connect(mapStateToProps, { initializeProviderCabinet })(ProviderMonetization);
// export default UserCabinetHobbies;
