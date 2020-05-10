import React, { Component, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './ProviderOwnHobbies.module.css';
import Slot from '../../MainPage/Slot/Slot';
import { initializeProviderCabinet } from '../../../redux/actions/providerActions';
import AddIcon from '@material-ui/icons/Add';
import Monetization from "../../MainPage/Slot/Price/Monetization";

const flags = {
    isParking: true,
    isBeginner: true,
    isRent: true,
};
const image = 'https://kravmaganewcastle.com.au/wp-content/uploads/2017/04/default-image-800x600.jpg';

const ProviderOwnHobbies = (props) => {
    useEffect(() => {
        props.initializeProviderCabinet();
    }, []);

    // if (!props.isAuth) {
    //    return <Redirect to={'/'} />;
    // }

    return (<div className={style.background}>
        <div className={style.headerContainer}>
            <span className={style.hobbyHeader}>Ваши хобби:</span>
            <span><Link to='/provider/cabinet/add_hobby' className={style.addButton}>
                Добавить<AddIcon className={style.iconAdd} style={{ color: 'rgba(0, 0, 0, 0.4)' }}/>
            </Link></span>
        </div>
        <div className={style.slotContainer}>
            <div className="center">
                <Slot pic={image} name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                      price='400 p.' priceTime='за занятие' priceCurriculum='по будням'
                      Widget={12} Top={0} Poster={0}
                      isUserAuth={props.isUserAuth} isProviderAuth={props.isProviderAuth} isOwn={true}/>
                <Slot pic={image} name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                      price={null} priceTime={null} priceCurriculum={null}
                      Widget={0} Top={3} Poster={6}
                      isUserAuth={props.isUserAuth} isProviderAuth={props.isProviderAuth} isOwn={true}/>
                <Slot pic={image} name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                      price='400 p.' priceTime='за занятие' priceCurriculum='по будням'
                      Widget={5} Top={3} Poster={1}
                      isUserAuth={props.isUserAuth} isProviderAuth={props.isProviderAuth} isOwn={true}/>
                <Slot pic={image} name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                      price='400 p.' priceTime='за занятие' priceCurriculum='по будням'
                      Widget={0} Top={0} Poster={0}
                      isUserAuth={props.isUserAuth} isProviderAuth={props.isProviderAuth} isOwn={true}/>
            </div>
        </div>
    </div>);
};

const mapStateToProps = (state) => ({
    // providerIsAuth: state.providerCabinet.providerIsAuth,
    isProviderAuth: true,
    isUserAuth: true,
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
export default connect(mapStateToProps, { initializeProviderCabinet })(ProviderOwnHobbies);
// export default UserCabinetHobbies;
