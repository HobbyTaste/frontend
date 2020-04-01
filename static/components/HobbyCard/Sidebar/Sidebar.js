import style from './Sidebar.css';
import { connect } from 'react-redux';
import React from 'react';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';


const Sidebar= (props) => {
    return (
        <div>
            <div className={style.container}>
                <h5 className={style.headerPrice}>Цена</h5>
                <h6 className={style.text}>{props.price}</h6>
            </div>
            {props.flag.isParking && <div className={style.flags + ' ' + style.parking}><div>Рядом парковка </div><div className={style.icon}><DoneOutlineIcon style={{ fontSize: 15}} /></div> </div>}
            {props.flag.isBegginer && <div className={style.flags + ' ' + style.beginner}>Для новичков <p className={style.icon}><DoneOutlineIcon style={{ fontSize: 15}} /></p> </div>}
            {props.flag.isRent && <div className={style.flags + ' ' + style.rent}>Аренда экипировки <p className={style.icon}><DoneOutlineIcon style={{ fontSize: 15}} /></p> </div>}

            <div className={style.container + ' ' + style.contantContainer} >
                <h5 className={style.contact}>  КОНТАКТЫ:</h5>
                <div className={style.contact}>EMAIL: {props.email}</div>
                <h5 className={style.contact}>ТЕЛ: {props.mobile}</h5>

            </div>

        </div>
    );
};


export default Sidebar;
