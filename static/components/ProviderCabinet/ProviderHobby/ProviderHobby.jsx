import React, { Component, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import style from "./ProviderHobby.module.css";
import Slot from "../../MainPage/Slot/Slot";
import { initializeFollowedHobbies } from "../../../redux/actions/providerActions";
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

    const hobbiesToShow = props.followedHobbies.map((hobby) => (
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
            isUserAuth={false}
            isProviderAuth={true}
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
    providerIsAuth: state.providerCabinet.providerIsAuth,
    fetchedFollowedHobbies: state.providerCabinet.fetchedFollowedHobbies,
    followedHobbies: state.providerCabinet.followedHobbies,
});

// maybe need own initializer
export default connect(mapStateToProps, { initializeFollowedHobbies })(ProviderFollowedHobbies);
// export default UserCabinetHobbies;
