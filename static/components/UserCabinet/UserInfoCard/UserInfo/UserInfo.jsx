import React, { useState } from 'react';
import style from './UserInfo.module.css';
import { AnimatedModalWindow } from '../../../../HOC/AnimatedModalWindow/AnimatedModalWindow';
import ChangeForm from './ChangeUserInfoForm/ChangeUserInfoForm';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EditIcon from '@material-ui/icons/Edit';

const UserInfo = (props) => {
    // const Edit = AnimatedModalWindow(ChangeForm, 'Редактировать');
    const [editing, setEditing] = useState(false);
    function Edit() {
        function handleClick(e) {
            setEditing(true);
        }
        return (
            <button className={style.buttonChange} onClick={handleClick}>
                Редактировать<EditIcon className={style.iconEdit}/>
            </button>
        );
    }
    return (
        <div className={style.infoContainer}>
            { editing
                ? <ChangeForm name={props.name} metro={props.metro}/>
                : <div>
                    <div className={style.name}>{props.name}</div>
                    <div className={style.metro}>
                        <LocationOnIcon style={{ color: '#178FD6' }} /> {props.metro}
                    </div>
                    <Edit/>
                </div>
            }
        </div>
    );
};

export default UserInfo;
