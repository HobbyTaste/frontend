import React from 'react';
import s from './../Header.module.css';
import UserCabinetButton from "./Buttons/UserCabinetButton";
import UserMenu from "./Buttons/UserMenu";
import Avatar from "./Avatar/Avatar";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';



const LogoutUser = (props) => {
    return (<div className={s.userContainer}>
            <AccountCircleIcon fontSize="large" className={s.icon}></AccountCircleIcon>
            <UserMenu logout={props.logout} name={props.name}/>
        </div>
    );
};

export default LogoutUser;
