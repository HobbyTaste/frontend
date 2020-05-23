import React, { Component, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import style from "./ProviderHobby.module.css";
import Slot from "../../MainPage/Slot/Slot";
import { initializeFollowedHobbies, subscribeForHobby } from "../../../redux/actions/providerActions";
import AddIcon from "@material-ui/icons/Add";
import Monetization from "../../MainPage/Slot/Price/Monetization";
import Preloader from "../../Common/Preloader/Preloader";


function firstLettersToUpperCase(text) {
    return text
        .split(' ')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' ');
}


const ProviderFollowedHobbies = (props) => {
    useEffect(() => {
        props.initializeFollowedHobbies();
    }, []);

    if (!props.providerIsAuth) {
        return <Redirect to={"/"} />;
    }

    if (props.fetchedFollowedHobbies !== "success") {
        return <Preloader/>;
    }

    async function handleHobbyClick(event, hobbyId) {
        await props.subscribeForHobby(hobbyId);
    }

    const hobbiesToShow = props.followedHobbies.map((hobby) => (
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
            <div className={style.headerContainer}>
                <span className={style.hobbyHeader}>Ваши хобби:</span>
            </div>
            <div className={style.slotContainer}>
                {hobbiesToShow}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    id: state.providerCabinet.id,
    providerIsAuth: state.providerCabinet.providerIsAuth,
    fetchedFollowedHobbies: state.providerCabinet.fetchedFollowedHobbies,
    followedHobbies: state.providerCabinet.followedHobbies,
});

// maybe need own initializer
export default connect(mapStateToProps, { initializeFollowedHobbies, subscribeForHobby })(ProviderFollowedHobbies);
// export default UserCabinetHobbies;
