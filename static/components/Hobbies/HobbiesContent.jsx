import React, {Component} from 'react';
import s from './HobbiesContent.module.css';
import HobbyCard from "./HobbyCard/HobbyCard";

let HobbiesContent = (props) => {

    const hobbyCards = props.hobbyCards.map(c => <HobbyCard {...c} isAuth={props.isAuth}
                                                            addNewHobby={props.addNewHobby}
                                                            userId={props.userId}
                                                            hobbiesMetro={props.hobbiesMetro}
                                                            type={props.type}
                                                            addingInProgress={props.addingInProgress}/>);

    return (<div>
        <div className={s.title}>Результаты поиска</div>
        <div className={s.body}>
            <div className={s.scrollBlock}>
                <div className={s.blockForCards}>
            {hobbyCards}
                </div>
            </div>
        </div>
    </div>);
};

export default HobbiesContent;