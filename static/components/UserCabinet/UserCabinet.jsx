import React, { Component, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import style from './UserCabinet.module.css';
import UserInfoCard from './UserInfoCard/UserInfoCard';
import { initializeUserCabinet } from '../../redux/reducers/auth-reducer';
import UserHobbyCard from './UserHobbyCard/UserHobbyCard';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EditIcon from '@material-ui/icons/Edit';

const UserCabinet = (props) => {
    useEffect(() => {
        props.initializeUserCabinet();
    }, []);

//    if (!props.isAuth) {
//        return <Redirect to={'/'} />;
//    }
    const myHobbies = props.userHobbies.map((c) => <UserHobbyCard {...c} isAuth={props.isAuth}/>);

    return (<div className={style.background}>
        <div className={style.infoContainer}>
            <img className={style.avatar} src={props.avatar}/>
            <span className={style.info}>
                <div className={style.name}>{props.name}</div>
                <div className={style.metro}>
                    <LocationOnIcon style={{ color: '##178FD6' }} /> {props.metro}
                </div>
                <button className={style.buttonChange}>
                    Редактировать<EditIcon className={style.iconEdit}/>
                </button>
            </span>
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
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { initializeUserCabinet })(UserCabinet);
