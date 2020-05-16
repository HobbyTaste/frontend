import React from 'react';
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
                        <Slot id={item._id} owner={item.owner} subscribers={item.subscribers.concat(item.providerSubscribers)} idUser={props.idUser}
                              pic={item.avatar} name={item.label} metro={item.metroStation} adress={item.address}
                              price={item.price.title} isUserAuth={isUserAuth} isProviderAuth={isProviderAuth}
                              isBeginner={item.novice} rating={item.rating}
                              isRent={item.equipment} isChild={item.children} isParking={item.parking}
                              priceTime={item.price.priceList} isOwner={(props.idUser === item.owner)}
                              onClick={props.onClick}/>
                    </li>;
                })
            }
        </ul>
    );
};


export default Content;
