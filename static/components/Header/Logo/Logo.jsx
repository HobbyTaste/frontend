import React, {Component} from 'react';
import s from './Logo.module.css';


const Logo = (props) => {

    let setUserOutCabinet = () => {
        props.setIsUserInCabinet(false);
    };

    return (<div className={s.logo} onClick={setUserOutCabinet}>HobbyTaste</div>);
};

export default Logo;