import React, {Component} from 'react';
import style from './HobbyCard.module.css';
import {GreenButton} from "../../Common/MaterialsButtons";
import CardImage from "./CardImage/CardImage";
import {AnimatedModalWindow} from "../../../HOC/AnimatedModalWindow/AnimatedModalWindow";
import HobbyInfo from "./CardImage/HobbyInfo/HobbyInfo";

//userId, props.subscribers: []

const HobbyCard = (props) => {
    const addHobby = () => {
        props.addNewHobby(props._id);
    };
    let Details = AnimatedModalWindow(HobbyInfo, "ПОДРОБНЕЕ", props);

    if(!props.isAuth) {
        return(
            <div className={style.scrollBlock}>
                <div className={style.blockForCards}>
                    <div className={style.card} key={props.owner}>
                        <CardImage cardImg={props.avatar}/>
                        <span className={style.name}>{props.label}</span>
                        <ul className={style.ul}>
                            <li>Телефон: {props.phone}</li>
                            <li>Email: {props.email}</li>
                            <li>Станция метро: {props.metroStation}</li>
                        </ul>
                        <div className={style.buttons}>
                            <Details/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    //пользователь есть и не подписан на хобби
    else if(props.isAuth && props.subscribers.indexOf(props.userId) === -1) {
        return (
            <div className={style.scrollBlock}>
                <div className={style.blockForCards}>
                    <div className={style.card} key={props.owner}>
                        <CardImage cardImg={props.avatar}/>
                        <span className={style.name}>{props.label}</span>
                        <ul className={style.ul}>
                            <li>Телефон: {props.phone}</li>
                            <li>Email: {props.email}</li>
                            <li>Станция метро: {props.metroStation}</li>
                        </ul>
                        <div className={style.buttons}>
                            <div onClick={addHobby}>
                                <GreenButton text="ДОБАВИТЬ ХОББИ" type="button"/>
                            </div>
                            <Details/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    //пользователь есть и подписан на хобби
    return(
        <div className={style.scrollBlock}>
            <div className={style.blockForCards}>
                <div className={style.card} key={props.owner}>
                    <CardImage cardImg={props.avatar}/>
                    <span className={style.name}>{props.label}</span>
                    <ul className={style.ul}>
                        <li>Телефон: {props.phone}</li>
                        <li>Email: {props.email}</li>
                        <li>Станция метро: {props.metroStation}</li>
                    </ul>
                    <div className={style.buttons}>
                        <div>
                            <GreenButton text="ХОББИ ДОБАВЛЕНО" type="button"/>
                        </div>
                        <Details/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HobbyCard;