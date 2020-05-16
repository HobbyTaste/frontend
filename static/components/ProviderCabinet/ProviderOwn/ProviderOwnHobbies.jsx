import React, { Component, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import style from "./ProviderOwnHobbies.module.css";
import Slot from "../../MainPage/Slot/Slot";
import { initializeProviderHobbies } from "../../../redux/actions/providerActions";
import AddIcon from "@material-ui/icons/Add";
import Monetization from "../../MainPage/Slot/Price/Monetization";

const ProviderOwnHobbies = (props) => {
    useEffect(() => {
        props.initializeProviderHobbies();
    }, []);

    if (!props.providerIsAuth) {
        return <Redirect to={"/"} />;
    }

    const hobbiesToShow = props.providerHobbies.map((hobby) => (
        <Slot
            key={hobby._id}
            id={hobby._id}
            owner={hobby.owner}
            subscribers={hobby.subscribers}
            pic={hobby.avatar}
            name={hobby.label}
            metro={hobby.metroStation}
            adress={hobby.address}
            price={hobby.price.title}
            isUserAuth={false}
            isProviderAuth={true}
            isBeginner={hobby.novice}
            isRent={hobby.equipment}
            isChild={hobby.children}
            isParking={hobby.parking}
            isOwn={true}
            priceTime={"За занятие"}
        />
    ));

    return (
        <div className={style.background}>
            <div className={style.headerContainer}>
                <span className={style.hobbyHeader}>Ваши хобби:</span>
                <span>
                    <Link to="/provider/cabinet/add_hobby" className={style.addButton}>
                        Добавить
                        <AddIcon className={style.iconAdd} style={{ color: "rgba(0, 0, 0, 0.4)" }} />
                    </Link>
                </span>
            </div>
            <div className={style.slotContainer}>
                {hobbiesToShow}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    providerIsAuth: state.providerCabinet.providerIsAuth,
    name: state.providerCabinet.name,
    email: state.providerCabinet.email,
    phone: state.providerCabinet.phone,
    info: state.providerCabinet.info,
    avatar: state.providerCabinet.avatar,
    providerInitialized: state.providerCabinet.providerInitialized,
    providerHobbies: state.providerCabinet.providerHobbies,
});

// maybe need own initializer
export default connect(mapStateToProps, { initializeProviderHobbies })(ProviderOwnHobbies);
// export default UserCabinetHobbies;
