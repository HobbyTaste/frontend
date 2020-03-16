import React from 'react';
import style from "./AddHobbyCard.module.css";

export const AddHobbyCard = (props) => {
    return(
        <div className={style.card}>
            <div className={style.hobbyName}>{props.organization}</div>
            {props.image ? <img src={`${props.image}`} alt=" " className={style.hobbyImage}/>
            : <div />}
            <div className={style.hobbyInfo}>
                <h1 className={style.title}>Контактные данные</h1>
                <ul>
                    {props.telephone ? <li>Телефон: {props.telephone}</li> : null}
                    {props.email ? <li>Email: {props.email}</li> : null}
                    {props.metro ? <li>Станция метро: {props.metro}</li> : null}
                    {props.address ? <li>Точный адрес: {props.address}</li> : null}
                    {props.category ? <li>Категория: {props.category}</li> : null}
                </ul>
                <div className={style.emptyCell} />
                <h1 className={style.title}>Краткая информация</h1>
                <div className={style.hobbyTextInfo}>{props.information}</div>
            </div>
        </div>
    );
};