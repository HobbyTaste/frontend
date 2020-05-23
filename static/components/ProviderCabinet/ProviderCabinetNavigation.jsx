import React, {Component} from 'react';
import style from './ProviderCabinet.module.css';
import Button from '../Navigation/Button/Button';
import {Link} from 'react-router-dom';

const ProviderCabinetNavigation = (props) => {
    return (
        <nav className={style.navigation}>
            <Button/>
            <ul className={style.menu}>
                <Link className={`${style.menuPoint} ${props.isActive === 0 ? style.activeCategory : style.passiveCategory}`} to="/provider/cabinet">ПРОФИЛЬ</Link>
                <Link className={`${style.menuPoint} ${props.isActive === 1 ? style.activeCategory : style.passiveCategory}`} to="/provider/cabinet/own">МОИ ХОББИ</Link>
                {/* <Link className={`${style.menuPoint} ${props.isActive === 2 ? style.activeCategory : style.passiveCategory}`} to="/provider/cabinet/monetization">МОНЕТИЗАЦИЯ</Link> */}
                <Link className={`${style.menuPoint} ${props.isActive === 3 ? style.activeCategory : style.passiveCategory}`} to="/provider/cabinet/hobbies">ИЗБРАННОЕ</Link>
            </ul>
        </nav>

    );
};

export default ProviderCabinetNavigation;
