import React, { Component, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import style from "./UserCabinet.module.css";
import { initializeUserHobbies } from "../../redux/actions/userActions";
import Slot from "../MainPage/Slot/Slot";
import { defaultAvatarUrl, defaultHobbyImageUrl } from "../../utils/constant";


const UserCabinetHobbies = (props) => {
    useEffect(() => {
        props.initializeUserHobbies();
    }, []);

    if (!props.isUserAuth) {
        return <Redirect to={"/"} />;
    }

    // add selecting hobbies from props info
    const hobbiesToShow = props.userHobbies.map((hobby) => (
        <Slot
            {...hobby}
            isUserAuth={props.isUserAuth}
            isProviderAuth={props.isProviderAuth}
            key={hobby.name + hobby.address}
        />
    ));

    return (
        <div className={style.background}>
            <div className={style.hobbyHeader}>Ваши хобби:</div>
            <div className={style.slotContainer}>
                <div className="center">
                    {hobbiesToShow}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    userHobbies: state.userCabinet.userHobbies,
    isUserAuth: state.userCabinet.isAuth,
    isProviderAuth: state.providerCabinet.isAuth,
});

export default connect(mapStateToProps, { initializeUserHobbies })(UserCabinetHobbies);
