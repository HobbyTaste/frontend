import React from 'react';
import s from './../Header.module.css';
import UserCabinetButton from "./Buttons/UserCabinetButton";
import LogoutButton from "./Buttons/LogoutButton";
import Avatar from "./Avatar/Avatar";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const LogoutUser = (props) => {
    return (<div className={s.userContainer}>
            <AccountCircleIcon fontSize="large" className={s.icon}></AccountCircleIcon>
            <LogoutButton name={props.name}/>
        </div>
    );
};

export default LogoutUser;
