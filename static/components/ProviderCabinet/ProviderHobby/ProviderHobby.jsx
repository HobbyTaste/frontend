import React, { Component, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import style from './ProviderHobby.module.css';
import Slot from '../../MainPage/Slot/Slot';
import { initializeProviderCabinet } from '../../../redux/actions/providerActions';

const flags = {
    isParking: true,
    isBeginner: true,
    isRent: true,
};
const image = 'https://kravmaganewcastle.com.au/wp-content/uploads/2017/04/default-image-800x600.jpg';

const ProviderHobby = (props) => {
    useEffect(() => {
        props.initializeProviderCabinet();
    }, []);

    // if (!props.isAuth) {
    //    return <Redirect to={'/'} />;
    // }

    return (<div className={style.background}>
        <div className={style.hobbyHeader}>Ваши хобби:</div>
        <div className={style.slotContainer}>
            <div className="center">
                <Slot pic={image} name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                      price='400 p.' priceTime='за занятие' priceCurriculum='по будням'
                      isParking={flags.isParking} isBeginner={flags.isBeginner} isRent={flags.isRent}
                      isUserAuth={props.isUserAuth} isProviderAuth={props.isProviderAuth}/>
                <Slot pic={image} name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                      price={null} priceTime={null} priceCurriculum={null}
                      isParking={false} isBeginner={flags.isBeginner} isRent={flags.isRent}
                      isUserAuth={props.isUserAuth} isProviderAuth={props.isProviderAuth}/>
                <Slot pic={image} name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                      price='400 p.' priceTime='за занятие' priceCurriculum='по будням'
                      isParking={flags.isParking} isBeginner={false} isRent={flags.isRent}
                      isUserAuth={props.isUserAuth} isProviderAuth={props.isProviderAuth}/>
                <Slot pic={image} name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                      price='400 p.' priceTime='за занятие' priceCurriculum='по будням'
                      isParking={flags.isParking} isBeginner={flags.isBeginner} isRent={false}
                      isUserAuth={props.isUserAuth} isProviderAuth={props.isProviderAuth}/>
                <Slot pic={image} name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                      price='400 p.' priceTime='за занятие' priceCurriculum='по будням'
                      isParking={false} isBeginner={false} isRent={flags.isRent}
                      isUserAuth={props.isUserAuth} isProviderAuth={props.isProviderAuth}/>
            </div>
        </div>
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
export default connect(mapStateToProps, { initializeProviderCabinet })(ProviderHobby);
// export default UserCabinetHobbies;
