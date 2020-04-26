import React, {Component} from 'react';
import style from './HobbyCard.css';
import feedStyle from './Feedback/Feedback.css'
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Feedback from './Feedback/Feedback';
import FeedbackFormUser from './Feedback/FeedbackFormUser';
import ImageSlider from './Image/Image';
import Sidebar from './Sidebar/Sidebar';
import ButtonInMyHobby from './Button/ButtonUser';
import ButtonProvider from './Button/ButtonProvider'
import Slider from './Image/Slider'

import InformationForm from './InformationForm/InformationForm';
const textExample="      Как держаться в седле?\n" +
    "\n" +
    "                        Поднявшись в седло, всадник должен принять правильное положение. Спину держат прямо, стараясь не смещать центр тяжести. Правильная посадка подразумевает полное расслабление мышц, поза должна быть естественной. Тазобедренные кости находятся чётко в углублении седла.\n" +
    "\n" +
    "                        Важно научиться держать равновесие, как бы повторяя движения скакуна. Умение балансировать приходит с опытом, поэтому обучение проводят только на спокойных и уравновешенных питомцах. Всадник держится в седле благодаря мышцам на внутренней части бёдер, но это не значит, что он постоянно напряжён. Когда приходит ощущение уверенности, наездник управляет телом неосознанно.\n" +
    "     "

const flags={
    isParking: true,
    isBegginer: true,
    isRent:true
}


const HobbyCard = (props) => {
    return (
        <div>
            <div className={style.infoContainer}>
                <div className={style.mainContainer}>
                    <div className={style.mainBlock}>
                        <div className={style.imageContainer}><Slider/></div>
                        <div className={style.textContainer}><InformationForm name='Вид хобби' metro='Станция метро' time='пн чт 21:30'
                                                                              equipment= 'выдается' adress="Долгопрудный, Первомайская 32 к2" specialConditions='Чай только зеленый с лимоном без сахара' comfortable='диванчики'/>

                            <div className={style.buttonContainer}>
                                {props.isUserAuth && <ButtonInMyHobby />}
                                {props.isProviderAuth && <ButtonProvider text="Редактировать"/>}
                            </div>
                        </div>
                    </div>

                    <h4 className={style.mainDescription}>
                        Описание. Тут должно быть много текста (ну или не очень)
                        {textExample}
                         </h4>
                </div>
                <div className={style.panel}>
                    <Sidebar price="подробные цены за все варианты" mobile="+7(***)***-**-**" email="ld@gmail.com" flag={flags}/>
                </div>
            </div>
            <div className={style.communication}>
                <p className={feedStyle.labelAnswer} > Отзывы:</p>
                    <Feedback isUserAuth={props.isUserAuth} isProviderAuth={props.isProviderAuth} />

            </div>
        </div>
       );
};

/*Их стора куча данных достать и сделать свойствами*/
let mapStateToProps = (state) => ({
    //providerIsAuth: state.providerCabinet.providerIsAuth
    isUserAuth: true,
    isProviderAuth: false,

});

export default connect(mapStateToProps, null)(HobbyCard);
