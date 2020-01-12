import React, {Component} from 'react';
import style from './UserHobbyCard.module.css';
import {GreenButton} from "../../Common/MaterialsButtons";
import {AnimatedModalWindow} from "../../../HOC/AnimatedModalWindow/AnimatedModalWindow";
import CardImage from "../../Hobbies/HobbyCard/CardImage/CardImage";
import HobbyInfo from "../../Hobbies/HobbyCard/CardImage/HobbyInfo/HobbyInfo";

const UserHobbyCard = (props) => {
    let Details = AnimatedModalWindow(HobbyInfo, "ПОДРОБНЕЕ", props);
    return (
        <div>
            <div className={style.card} key={props.owner}>
                <CardImage cardImg={props.avatar}/>
                <span className={style.name}>{props.label}</span>
                <ul className={style.ul}>
                    <li>Телефон: {props.phone}</li>
                    <li>Email: {props.email}</li>
                    <li>Метро: {props.metroStation}</li>
                </ul>
                <div className={style.buttons}>
                    <Details/>
                </div>
            </div>
        </div>
    );
};

export default UserHobbyCard;