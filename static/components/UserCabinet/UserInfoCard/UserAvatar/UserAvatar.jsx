import React, {Component} from 'react';
import style from "./UserAvatar.module.css";

const UserAvatar = (props) => {
    return (
        <div className={style.imgWrapper}>
            <div className={style.imgContainer}>
                <div className={style.img}
                     style={{
                         backgroundImage: `url("${props.url}")`
                     }}>
                </div>
            </div>
        </div>
    );
};

export default UserAvatar;
