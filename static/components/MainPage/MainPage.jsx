import React, {Component} from 'react';
import style from './MainPage.module.css';
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeMainPage} from "../../redux/reducers/mainPage-reducer";
import Preloader from "../Common/Preloader/Preloader";
import {withRouter, Redirect} from 'react-router-dom';
import Slot from './Slot/Slot';
import CardSlider from './CardSlider';
import Card from './Card/Card';

const flags={
    isParking: true,
    isBeginner: true,
    isRent: true
}

const images = ['https://czech-rurepublic-gb.ru/wp-content/uploads/2015/12/143635088818.jpg',
    'https://w-dog.ru/wallpapers/0/0/437992000662990/kamera-fotoapparat-contax-devushka-fotograf.jpg',
    'https://images.wallpaperscraft.com/image/strings_balls_coils_needles_sewing_hobby_49168_1680x1050.jpg',
    'https://images.wallpaperscraft.com/image/watercolor_paints_palette_156356_1600x1200.jpg',
    'https://images.wallpaperscraft.com/image/craft_souvenir_handmade_hobby_49158_1600x900.jpg',
    'https://images.wallpaperscraft.com/image/skateboard_skateboarder_hobby_116485_1600x1200.jpg']

const image='https://kravmaganewcastle.com.au/wp-content/uploads/2017/04/default-image-800x600.jpg';

class MainPage extends React.Component {
    componentDidMount() {
        this.props.initializeMainPage();
    }

    render() {
        if (!this.props.initializedMainPage) {
            return <Preloader />;
        }
        return (<div className={style.background}>
            <div className={style.cardContainer}>
                <CardSlider isUserAuth={this.props.isUserAuth} isProviderAuth={this.props.isProviderAuth}/>
            </div>
            <div className={style.header}>Топ 10 новинок</div>
            <div className={style.slotContainer}>
                <div className="center">
                    <Slot pic={image} name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                          price='400 p.' priceTime='за занятие' priceCurriculum='по будням'
                          isParking={flags.isParking} isBeginner={flags.isBeginner} isRent={flags.isRent}
                          isUserAuth={this.props.isUserAuth} isProviderAuth={this.props.isProviderAuth}/>
                    <Slot pic={image} name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                          price={null} priceTime={null} priceCurriculum={null}
                          isParking={false} isBeginner={flags.isBeginner} isRent={flags.isRent}
                          isUserAuth={this.props.isUserAuth} isProviderAuth={this.props.isProviderAuth}/>
                    <Slot pic={image} name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                          price='400 p.' priceTime='за занятие' priceCurriculum='по будням'
                          isParking={flags.isParking} isBeginner={false} isRent={flags.isRent}
                          isUserAuth={this.props.isUserAuth} isProviderAuth={this.props.isProviderAuth}/>
                    <Slot pic={image} name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                          price='400 p.' priceTime='за занятие' priceCurriculum='по будням'
                          isParking={flags.isParking} isBeginner={flags.isBeginner} isRent={false}
                          isUserAuth={this.props.isUserAuth} isProviderAuth={this.props.isProviderAuth}/>
                    <Slot pic={image} name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                          price='400 p.' priceTime='за занятие' priceCurriculum='по будням'
                          isParking={false} isBeginner={false} isRent={flags.isRent}
                          isUserAuth={this.props.isUserAuth} isProviderAuth={this.props.isProviderAuth}/>
                    <Slot pic={image} name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                          price='400 p.' priceTime='за занятие' priceCurriculum='по будням'
                          isParking={flags.isParking} isBeginner={false} isRent={false}
                          isUserAuth={this.props.isUserAuth} isProviderAuth={this.props.isProviderAuth}/>
                    <Slot pic={image} name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                          price='400 p.' priceTime='за занятие' priceCurriculum='по будням'
                          isParking={false} isBeginner={flags.isBeginner} isRent={false}
                          isUserAuth={this.props.isUserAuth} isProviderAuth={this.props.isProviderAuth}/>

                </div>
            </div>
        </div>);
    }
}

const mapStateToProps = (state) => ({
    initializedMainPage: state.mainPage.initializedMainPage,
    isSubmit: state.mainPage.isSubmit,
    providerIsAuth: state.providerCabinet.providerIsAuth,
    isUserAuth: true,
});

export default compose(connect(mapStateToProps, { initializeMainPage }), withRouter)(MainPage);
