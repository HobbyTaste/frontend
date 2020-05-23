import React, { Component, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import style from "./UserCabinet.module.css";
import { initializeUserHobbies, subscribeForHobby } from "../../redux/actions/userActions";
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

    async function handleHobbyClick(event, hobbyId) {
        await props.subscribeForHobby(hobbyId);
    }

    // add selecting hobbies from props info
    const hobbiesToShow = props.userHobbies.map((hobby) => (
        <Slot
            key={hobby._id}
            pic={hobby.avatar}
            id={hobby._id}
            name={hobby.label}
            rating={hobby.rating}
            metro={firstLettersToUpperCase(hobby.metroStation)}
            adress={hobby.address}
            isOwn={false}
            isBeginner={hobby.novice}
            isRent={hobby.equipment}
            isChild={hobby.children}
            isParking={hobby.parking}
            price={hobby.price.title}
            priceTime={"Уточняйте"}
            isUserAuth={true}
            isProviderAuth={false}
            isOwner={false}
            idUser={props.id}
            subscribers={hobby.subscribers}
            onClick={handleHobbyClick}
        />
    ));

    return (
        <div className={style.background}>
            <div className={style.hobbyHeader}>Ваши хобби:</div>
            <div className={style.slotContainer}>
                <div className="center" style={{width: "100%"}}>
                    {hobbiesToShow}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    id: state.userCabinet.id,
    userHobbies: state.userCabinet.userHobbies,
    fetchingHobbies: state.userCabinet.fetchingHobbies,
    isUserAuth: state.userCabinet.isAuth,
    isProviderAuth: state.providerCabinet.isAuth,
});

export default connect(mapStateToProps, { initializeUserHobbies, subscribeForHobby })(UserCabinetHobbies);
