import React, {Component} from 'react';
import style from './MainPage.module.css';
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeMainPage} from "../../redux/reducers/mainPage-reducer";
import Preloader from "../Common/Preloader/Preloader";
import {withRouter, Redirect} from 'react-router-dom';
import Slot from './Slot/Slot';
import CardSlider from './CardSlider';

const flags={
    isParking: true,
    isBeginner: true,
    isRent: true
}

class MainPage extends React.Component {
    componentDidMount() {
        this.props.initializeMainPage();
    }

    render() {
        if (!this.props.initializedMainPage) {
            return <Preloader />;
        }
        return (<div className={style.background}>
            <div className={style.cardContainer}><CardSlider/></div>
            <div className={style.header}>Топ 10 новинок</div>
            <div className={style.slotContainer}>
                <div className="center">
                    <Slot name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                        price='400 p.' priceTime='за занятие' priceCurriculum='по будням'
                        isParking={flags.isParking} isBeginner={flags.isBeginner} isRent={flags.isRent}
                        isUserAuth={this.props.isUserAuth} isProviderAuth={this.props.isProviderAuth}/>
                </div>
                <div className="center">
                    <Slot name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                          price='400 p.' priceTime='за занятие' priceCurriculum='по будням'
                          isParking={flags.isParking} isBeginner={flags.isBeginner} isRent={flags.isRent}
                          isUserAuth={this.props.isUserAuth} isProviderAuth={this.props.isProviderAuth}/>
                </div>
                <div className="center">
                    <Slot name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                          price='400 p.' priceTime='за занятие' priceCurriculum='по будням'
                          isParking={flags.isParking} isBeginner={flags.isBeginner} isRent={flags.isRent}
                          isUserAuth={this.props.isUserAuth} isProviderAuth={this.props.isProviderAuth}/>
                </div>
                <div className="center">
                    <Slot name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                          price='400 p.' priceTime='за занятие' priceCurriculum='по будням'
                          isParking={flags.isParking} isBeginner={flags.isBeginner} isRent={flags.isRent}
                          isUserAuth={this.props.isUserAuth} isProviderAuth={this.props.isProviderAuth}/>
                </div>
                <div className="center">
                    <Slot name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                          price='400 p.' priceTime='за занятие' priceCurriculum='по будням'
                          isParking={flags.isParking} isBeginner={flags.isBeginner} isRent={flags.isRent}
                          isUserAuth={this.props.isUserAuth} isProviderAuth={this.props.isProviderAuth}/>
                </div>
                <div className="center">
                    <Slot name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                          price='400 p.' priceTime='за занятие' priceCurriculum='по будням'
                          isParking={flags.isParking} isBeginner={flags.isBeginner} isRent={flags.isRent}
                          isUserAuth={this.props.isUserAuth} isProviderAuth={this.props.isProviderAuth}/>
                </div>
            </div>
        </div>);
    }
}

const mapStateToProps = (state) => ({
    initializedMainPage: state.mainPage.initializedMainPage,
    isSubmit: state.mainPage.isSubmit,
    providerIsAuth: state.providerCabinet.providerIsAuth
});

export default compose(connect(mapStateToProps, { initializeMainPage }), withRouter)(MainPage);
