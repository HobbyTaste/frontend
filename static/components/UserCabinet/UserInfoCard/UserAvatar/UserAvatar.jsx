import React, {Component} from 'react';
import style from './UserAvatar.module.css';

const UserAvatar = (props) => {
    let avatar;
    if (props.url === 'null') {
        avatar = 'https://images.assetsdelivery.com/compings_v2/jenjawin/jenjawin1904/jenjawin190400208.jpg';
    } else {
        avatar = props.url;
    }
    return (
        <div className={style.avatar}>
            <div className={style.imgContainer}>
                <div className={style.img}
                    style={{ backgroundImage: `url("${avatar}")` }}>
                </div>
            </div>
        </div>
    );
};

export default UserAvatar;
