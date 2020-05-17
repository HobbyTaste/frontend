import React, { Component, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import style from "./UserCabinet.module.css";
import { initializeUserHobbies } from "../../redux/actions/userActions";
import Slot from "../MainPage/Slot/Slot";
import { defaultAvatarUrl, defaultHobbyImageUrl } from "../../utils/constant";
import Preloader from "../Common/Preloader/Preloader";


function firstLettersToUpperCase(text) {
    return text
        .split(' ')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' ');
}


const UserCabinetHobbies = (props) => {
    useEffect(() => {
        props.initializeUserHobbies();
    }, []);

    if (!props.isUserAuth) {
        return <Redirect to={"/"} />;
    }

    if (props.fetchingHobbies !== "success") {
        return <Preloader/>;
    }

    // add selecting hobbies from props info
    const hobbiesToShow = props.userHobbies.map((hobby) => (
        <Slot
            key={hobby._id}
            id={hobby._id}
            owner={hobby.owner}
            subscribers={hobby.subscribers}
            pic={hobby.avatar}
            name={hobby.label}
            metro={firstLettersToUpperCase(hobby.metroStation)}
            adress={hobby.address}
            price={hobby.price.title}
            isUserAuth={true}
            isProviderAuth={false}
            isBeginner={hobby.novice}
            isRent={hobby.equipment}
            isChild={hobby.children}
            isParking={hobby.parking}
            isOwn={false}
            priceTime={"За занятие"}
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
    fetchingHobbies: state.userCabinet.fetchingHobbies,
    isUserAuth: state.userCabinet.isAuth,
    isProviderAuth: state.providerCabinet.isAuth,
});

export default connect(mapStateToProps, { initializeUserHobbies })(UserCabinetHobbies);
