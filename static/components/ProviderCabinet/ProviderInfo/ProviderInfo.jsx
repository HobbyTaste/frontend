import React, { useState } from 'react';
import style from './ProviderInfo.module.css';
import ChangeForm from './ChangeProviderForm/ChangeProviderForm';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EditIcon from '@material-ui/icons/Edit';

const ProviderInfo = (props) => {
    const [editing, setEditing] = useState(false);

    function handleClick(e) {
        setEditing(!editing);
    }

    let avatar;
    if (props.avatar === 'null') {
        avatar = 'https://images.assetsdelivery.com/compings_v2/jenjawin/jenjawin1904/jenjawin190400208.jpg';
    } else {
        avatar = props.avatar;
    }

    return (<div className={style.info}>
        <div className={style.avatar}>
            <div className={style.imgContainer}>
                <div className={style.img}
                    style={{ backgroundImage: `url("${avatar}")` }}>
                </div>
            </div>
        </div>
        <div className={style.infoContainer}>
            <div className={style.name}>{props.name}</div>
            { editing
                ? <div className={style.editContainer}>
                    <ChangeForm name={props.name} metro={props.metro} handleClick={handleClick}/>
                </div>
                : <div>
                    <button className={style.editButton} onClick={handleClick}>
                        Редактировать<EditIcon className={style.iconEdit}/>
                    </button>
                </div>
            }
        </div>
    </div>);
};

export default ProviderInfo;
