import style from './Sidebar.css';
import { connect } from 'react-redux';
import React from 'react';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import EmailIcon from '@material-ui/icons/Email';
import LaunchIcon from '@material-ui/icons/Launch';



const Sidebar= (props) => {
    return (
        <div>
            <div className={style.container}>
                <h5 className={style.headerPrice}>Цена</h5>
                <h6 className={style.text}>{props.price}</h6>
            </div>
            {props.flag.isParking && <div className={style.flags + ' ' + style.parking}><div>Рядом парковка</div><div className={style.icon}><DoneOutlineIcon style={{ fontSize: 15}} /></div> </div>}
            {props.flag.isBegginer && <div className={style.flags + ' ' + style.beginner}>Для новичков<p className={style.icon}><DoneOutlineIcon style={{ fontSize: 15}} /></p> </div>}
            {props.flag.isRent && <div className={style.flags + ' ' + style.rent}>Экипировка<p className={style.icon}><DoneOutlineIcon style={{ fontSize: 15}} /></p> </div>}

            <div className={style.container + ' ' + style.contantContainer} >
                <h5 className={style.contact}>  КОНТАКТЫ:</h5>
                <h5 className={style.contact + ' '+ style.mobile}>ТЕЛ: {props.mobile}</h5>
                <div className={style.contact}> <LaunchIcon /> <EmailIcon /></div>

            </div>

        </div>
    );
};


export default Sidebar;
