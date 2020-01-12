import React from 'react';
import style from './Avatar.module.css';

const Avatar = (props) => {
    let avatar;
    if(props.avatar === "null") {
        avatar = 'https://images.assetsdelivery.com/compings_v2/jenjawin/jenjawin1904/jenjawin190400208.jpg';
    }
    else {
        avatar = props.avatar;
    }
  return(
      <div>
          <img src={avatar} alt="av" className={style.avatar}/>
      </div>
  );
};

export default Avatar;