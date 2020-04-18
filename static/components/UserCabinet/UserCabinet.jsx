import React, { Component, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import style from './UserCabinet.module.css';
import UserInfoCard from './UserInfoCard/UserInfoCard';
import { initializeUserCabinet } from '../../redux/reducers/auth-reducer';
import UserHobbyCard from './UserHobbyCard/UserHobbyCard';
import Feedback from '../HobbyCard/Feedback/Feedback';

const UserCabinet = (props) => {
    useEffect(() => {
        props.initializeUserCabinet();
    }, []);

    // if (!props.isAuth) {
    //    return <Redirect to={'/'} />;
    // }
    const myHobbies = props.userHobbies.map((c) => <UserHobbyCard {...c} isAuth={props.isAuth}/>);

    return (<div className={style.background}>
        <div className={style.infoContainer}>
            <UserInfoCard avatar={props.avatar} name={props.name} metro={props.metro}/>
        </div>
        <div className={style.feedbackHeader}>Ваши отзывы и ответы на них:</div>
        <div className={style.feedbackContainer}>
            <Feedback isUserAuth={props.isUserAuth} isProviderAuth={props.isProviderAuth} />
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
