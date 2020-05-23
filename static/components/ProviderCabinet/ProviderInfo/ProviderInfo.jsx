import React, { useState } from "react";
import style from "./ProviderInfo.module.css";
import ChangeForm from "./ChangeProviderForm/ChangeProviderForm";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EditIcon from "@material-ui/icons/Edit";
import { defaultAvatarUrl } from "../../../utils/constant";

const ProviderInfo = (props) => {
    const [editing, setEditing] = useState(false);

    function handleClick(e) {
        setEditing(!editing);
    }

    return (
        <div className={style.info}>
            <div className={style.avatar}>
                <div className={style.imgContainer}>
                    <div
                        className={style.img}
                        style={{ backgroundImage: `url("${props.avatar || defaultAvatarUrl}")` }}
                    ></div>
                </div>
            </div>
            <div className={style.infoContainer}>
                <div className={style.name}>{props.name}</div>
                <div className={style.contacts}>{props.email}</div>
                <div className={style.contacts}>{props.phone}</div>
                {editing ? (
                    <div className={style.editContainer}>
                        <ChangeForm name={props.name} email={props.email} phone={props.phone} handleClick={handleClick} />
                    </div>
                ) : (
                    <div>
                        <button className={style.editButton} onClick={handleClick}>
                            Редактировать
                            <EditIcon className={style.iconEdit} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProviderInfo;
