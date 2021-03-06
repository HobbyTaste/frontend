import React, { Component } from 'react';
import style from './UserInfoCard.module.css';
import UserAvatar from './UserAvatar/UserAvatar';
import UserInfo from './UserInfo/UserInfo';

const UserInfoCard = (props) => (
    <div className={style.info}>
        <UserAvatar url={props.avatar}/>
        <UserInfo name={props.name} email={props.email}/>
    </div>
);

export default UserInfoCard;
