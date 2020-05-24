import React, { Component, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import style from "./ProviderOwnHobbies.module.css";
import Slot from "../../MainPage/Slot/Slot";
import { initializeOwnHobbies } from "../../../redux/actions/providerActions";
import AddIcon from "@material-ui/icons/Add";
import Monetization from "../../MainPage/Slot/Price/Monetization";
import Preloader from "../../Common/Preloader/Preloader";


function firstLettersToUpperCase(text) {
    return text.trim().length > 0
        ? text
            .split(' ')
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(' ')
        : text;
}

function checkTariffType(hobby, type) {
    let days = 0;
    hobby.monetization.forEach(tariff => {
        if (tariff.tariff === type)
            // должно быть что-то типа (new Date(tariff.expirationDate) - new Date()) / (1000 * 60 * 60 * 24), 
            // только ещё бы expirationDate приходила в нужном формате
            days = 5; 
    });
    return days;
}

const ProviderOwnHobbies = (props) => {
    useEffect(() => {
        props.initializeOwnHobbies();
    }, []);

    if (!props.providerIsAuth) {
        return <Redirect to={"/"} />;
    }

    if (props.fetchedOwnHobbies !== "success") {
        return <Preloader/>;
    }

    const hobbiesToShow = props.providerHobbies.map((hobby) => (
        <Slot
            key={hobby._id}
            pic={hobby.avatar}
            id={hobby._id}
            name={hobby.label}
            rating={hobby.rating}
            metro={firstLettersToUpperCase(hobby.metroStation)}
            adress={hobby.address}
            isOwn={true}
            isUserAuth={false}
            isProviderAuth={true}
            isOwner={true}
            Widget={checkTariffType(hobby, 0)}
            Top={checkTariffType(hobby, 1)}
            Poster={checkTariffType(hobby, 2)}
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
    fetchedOwnHobbies: state.providerCabinet.fetchedOwnHobbies,
    providerHobbies: state.providerCabinet.ownHobbies,
});

// maybe need own initializer
export default connect(mapStateToProps, { initializeOwnHobbies })(ProviderOwnHobbies);
// export default UserCabinetHobbies;
