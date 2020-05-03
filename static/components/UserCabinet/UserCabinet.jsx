import React, { Component, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import style from "./UserCabinet.module.css";
import UserInfoCard from "./UserInfoCard/UserInfoCard";
import { initializeUserCabinet } from "../../redux/actions/userActions";
import Feedback from "../HobbyCard/Feedback/Feedback";
import { defaultAvatarUrl } from "../../utils/constant";
import UserComments from "./UserComments";

const UserCabinet = (props) => {
    useEffect(() => {
        props.initializeUserCabinet();
    }, []);

    if (!props.isAuth) {
        return <Redirect to={"/"} />;
    }

    return (
        <div className={style.background}>
            <div className={style.infoContainer}>
                <UserInfoCard avatar={props.avatar || defaultAvatarUrl} name={props.name} metro={props.metro} />
            </div>
            <div className={style.feedbackHeader}>Ваши отзывы и ответы на них:</div>
            <div className={style.feedbackContainer}>
                <UserComments/>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    name: state.userCabinet.name,
    //metro: state.userCabinet.metro,
    metro: "В модели на бэкенде пока нет метро",
    avatar: state.userCabinet.avatar,
    userHobbies: state.userCabinet.userHobbies,
    userComments: state.userCabinet.userComments,
    isAuth: state.userCabinet.isAuth,
    isProviderAuth: false,
});

export default connect(mapStateToProps, { initializeUserCabinet })(UserCabinet);
