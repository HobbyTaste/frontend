import React, {Component, useEffect} from 'react';
import style from "./UserCabinet.module.css";
import UserInfoCard from "./UserInfoCard/UserInfoCard";
import {Redirect} from "react-router-dom";
import HobbyCard from "../Hobbies/HobbyCard/HobbyCard";
import {initializeUserCabinet} from "../../redux/reducers/auth-reducer";
import {connect} from "react-redux";
import UserHobbyCard from "./UserHobbyCard/UserHobbyCard";

const UserCabinet = (props) => {
    useEffect(() => {
        props.initializeUserCabinet()
    }, []);

    if(!props.isAuth) {
        return <Redirect to={'/'} />
    }
    const myHobbies = props.userHobbies.map(c => <UserHobbyCard {...c} isAuth={props.isAuth}/>);

    return (<div>
        <div className={style.background}>
            <div className={style.layout}>
                <UserInfoCard name={props.name} email={props.email} avatar={props.avatar}/>

                <div className={style.hobbiesBlock}>
                    <div className={style.title}>Мои хобби</div>
                    <div className={style.scrollBlock}>
                        <div className={style.blockForCards}>
                            {myHobbies}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

const mapStateToProps = (state) => {
    return {
        email: state.auth.email,
        name: state.auth.name,
        avatar: state.auth.avatar,
        userHobbies: state.auth.userHobbies,
        isAuth: state.auth.isAuth
    }
};

export default connect(mapStateToProps, {initializeUserCabinet})(UserCabinet);