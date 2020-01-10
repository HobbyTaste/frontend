import React, {Component} from 'react';
import style from './HobbyCard.module.css';
import {GreenButton} from "../../Common/MaterialsButtons";
import CardImage from "./CardImage/CardImage";
import {AnimatedModalWindow} from "../../../HOC/AnimatedModalWindow/AnimatedModalWindow";
import HobbyInfo from "./CardImage/HobbyInfo/HobbyInfo";

const HobbyCard = (props) => {
    const addHobby = () => {
        props.addNewHobby(true, props.id);
    };
    let Details = AnimatedModalWindow(HobbyInfo, "ПОДРОБНЕЕ", props);
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
                    {props.isAuth ? <div className={style.buttons}>
                        {props.addingInProgress.some(id => id === props.id) ?
                            <div>DISABLED</div> : <div onClick={addHobby}>
                                <GreenButton text="ДОБАВИТЬ ХОББИ" type="button"/>
                            </div>}
                        <Details/>
                    </div> : <Details/>}
                </div>
            </div>
        </div>
    );
};

export default HobbyCard;