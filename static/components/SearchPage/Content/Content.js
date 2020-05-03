import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import LaunchIcon from '@material-ui/icons/Launch';
import EmailIcon from '@material-ui/icons/Email';
import React from 'react';
import CommentText from '../../HobbyCard/Feedback/CommentText';
import Slot from '../../MainPage/Slot/Slot';
import style from './Content.css';

const Content = (props) => {

    const isUserAuth = props.isUserAuth;
    const isProviderAuth = props.isProviderAuth;
    return (
        <ul className={style.list}>
            {
                props.hobbies.map(function (item) {
                    return <li key={item._id} className={style.container}>
                        <Slot id = {item._id} owner={item.owner} subscribers={item.subscribers} idUser={props.idUser} pic={item.avatar} name={item.label} metro={item.metroStation} adress={item.address} price={item.price}
                              isUserAuth={isUserAuth} isProviderAuth={isProviderAuth} isBeginner={item.novice}
                              isRent={item.equipment} isChild={item.children} isParking = {item.parking} priceTime={item.priceTime} isOwner={(props.idUser === item.owner)}
                              priceCurriculate={item.priceCurriculate}/>
                    </li>;
                })
            }
        </ul>
    );
};


export default Content;
