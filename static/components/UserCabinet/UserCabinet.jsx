import React, { Component, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import style from './UserCabinet.module.css';
import UserInfoCard from './UserInfoCard/UserInfoCard';
import { initializeUserCabinet } from '../../redux/actions/userActions';
import Feedback from '../HobbyCard/Feedback/Feedback';
import UserCabinetHobbies from './UserCabinetHobbies';
import CommentsList from '../HobbyCard/Feedback/CommentsList';

const UserCabinet = (props) => {
    useEffect(() => {
        props.initializeUserCabinet();
    }, []);

    // if (!props.isAuth) {
    //    return <Redirect to={'/'} />;
    // }

    return (
        <div className={style.background}>
            <div className={style.infoContainer}>
                <UserInfoCard avatar={props.avatar} name={props.name} metro={props.metro}/>
            </div>
            <div className={style.feedbackHeader}>Ваши отзывы и ответы на них:</div>
            <div className={style.feedbackContainer}>
                <CommentsList isProvider={props.isProvider} isOwner = {false} comments ={[]}/>
            </div>
        </div>);
};

const mapStateToProps = (state) => ({
    // name: state.auth.name,
    name: 'Иван Иванов',
    // metro: state.auth.metro,
    metro: 'Долгопрудная',
    // avatar: state.auth.avatar,
    avatar: 'https://kravmaganewcastle.com.au/wp-content/uploads/2017/04/default-image-800x600.jpg',
    userHobbies: state.auth.userHobbies,
    // isAuth: state.auth.isAuth,
    isUserAuth: true,
    isProviderAuth: false,
});

export default connect(mapStateToProps, { initializeUserCabinet })(UserCabinet);
