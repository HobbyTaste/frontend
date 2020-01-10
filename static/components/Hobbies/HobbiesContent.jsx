import React, {Component} from 'react';
import s from './HobbiesContent.module.css';
import HobbyCard from "./HobbyCard/HobbyCard";

let HobbiesContent = (props) => {

    const hobbyCards = props.hobbyCards.map(c => <HobbyCard {...c} isAuth={props.isAuth}
                                                            addNewHobby={props.addNewHobby}
                                                            userId={props.userId}/>);

    return (<div>
        <div className={s.title}>Результаты поиска</div>
        <div className={s.body}>
            {hobbyCards}
        </div>
    </div>);
};

export default HobbiesContent;