import React, {Component} from 'react';
import style from './ProviderInfo.module.css';
import {AnimatedModalWindow} from '../../../HOC/AnimatedModalWindow/AnimatedModalWindow';
import ChangeFormProvider from './ChangeProviderForm/ChangeProviderForm'

const ProviderInfo = (props) => {
    let Change = AnimatedModalWindow(ChangeFormProvider, "ИЗМЕНИТЬ", null, false);
    return (
        <div>
            <div className={style.name}>
                {props.name}
            </div>
            <div className={style.information}>
                <ul className={style.userInfo}>
                    <li>
                        <span className={style.title}>Email: </span>
                        {props.email}
                    </li>
                    <li>
                        <span className={style.title}>Телефон: </span> {props.phone}
                    </li>
                    <li>
                        <span className={style.title}>Информация о партнере: </span> {props.info}
                    </li>
                </ul>
                <div className={style.changeButton}>
                    <Change />
                </div>
            </div>
        </div>
    );
};

export default ProviderInfo;