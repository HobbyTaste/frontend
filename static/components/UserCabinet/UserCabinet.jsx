import React, {Component} from 'react';
import style from "./UserCabinet.module.css";
import UserInfoCard from "./UserInfoCard/UserInfoCard";
import UserHobbyCard from "./UserHobbyCard/UserHobbyCard";
import {Redirect} from "react-router-dom";

const UserCabinet = (props) => {
    if(!props.isAuth) {
        return <Redirect to={'/'} />
    }
    const myHobbies = props.userHobbies.map(c => <UserHobbyCard {...c}/>);

    return (<div>
        <div className={style.background}>
            <div className={style.layout}>
                <UserInfoCard name={props.name} email={props.email} avatar={props.avatar}/>
                <div className={style.hobbiesBlock}>
                    <div className={style.title}>Мои хобби</div>
                    {myHobbies}
                </div>
            </div>
        </div>
    </div>);
};

export default UserCabinet;