import React, {Component} from 'react';
import style from './HobbyInfo.module.css';

const HobbyInfo = (props) => {
    return (
        <div className={style.card}>
            <div className={style.container}>
                <div className={style.label}>
                    {props.label}
                </div>
                {props.avatar ?
                    <div className={style.image}>
                        <img src={props.avatar} alt="hobby"/>
                    </div> : null}
            </div>
            {props.phone ? <div>
                    <span className={style.span}>Телефон</span>: {props.phone} </div>
                : null}
            {props.email ? <div>
                <span className={style.span}>Email</span>: {props.email}
            </div> : null}
            {props.category ? <div>
                <span className={style.span}>Категория</span>: {props.category}
            </div> : null}
            {props.metroStation ? <div>
                <span className={style.span}>Станция метро</span>: {props.metroStation}
            </div> : null}
            {props.address ? <div>
                <span className={style.span}>Точный адресс</span>: {props.address}
            </div> : null}
            {props.description ? <div>
                <span className={style.span}>Описание</span>: {props.description}
            </div> : null}
        </div>
    );
};

export default HobbyInfo;