import React from 'react';
import s from './../Header.module.css';
import UserCabinetButton from "./Buttons/UserCabinetButton";
import LogoutButton from "./Buttons/LogoutButton";
import Avatar from "./Avatar/Avatar";

const LogoutUser = (props) => {
    return (<div className={s.buttonsContainer}>
            <Avatar avatar={props.avatar} />
            <UserCabinetButton/>
            <LogoutButton logout={props.logout}/>
        </div>
    );
};

export default LogoutUser;