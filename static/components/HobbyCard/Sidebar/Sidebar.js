import style from './Sidebar.css';
import { connect } from 'react-redux';
import React from 'react';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import EmailIcon from '@material-ui/icons/Email';
import LaunchIcon from '@material-ui/icons/Launch';
import facebook from '../../../../public/images/facebook.png';
import vk from '../../../../public/images/vk.png';
import instagram from '../../../../public/images/instagram.png';
import { Link, NavLink, withRouter } from 'react-router-dom';

const Sidebar= (props) => {
    return (
        <div>
            <div className={style.container}>
                <h5 className={style.headerPrice}>Цена</h5>
                <h6 className={style.headerPrice}>{props.price.title}</h6>
                <h6 className={style.text}>{props.price.priceList}</h6>
            </div>

            {props.flag.isParking && <div className={style.flags + ' ' + style.parking}><div>Рядом парковка</div><div className={style.icon}><DoneOutlineIcon style={{ fontSize: 15}} /></div> </div>}
            {props.flag.isBeginner && <div className={style.flags + ' ' + style.beginner}>Для новичков<p className={style.icon}><DoneOutlineIcon style={{ fontSize: 15}} /></p> </div>}
            {props.flag.isRent && <div className={style.flags + ' ' + style.rent}>Экипировка<p className={style.icon}><DoneOutlineIcon style={{ fontSize: 15}} /></p> </div>}

            <div className={style.container + ' ' + style.contantContainer} >
                <h5 className={style.contact}>  КОНТАКТЫ:</h5>
                <h5 className={style.contact + ' '+ style.mobile}>ТЕЛ: {props.contacts.mobile}</h5>
                <div className={style.contact}>
                   <span> {props.contacts.website && <a href={`${props.contacts.website}`} className={style.sites}><LaunchIcon /></a>}</span>
                   <div className={style.sites}>
                    {props.contacts.vk && <a href={`${props.contacts.vk}`} className={style.sites}><img src={vk}/></a> }
                    {props.contacts.instagram && <a href={`${props.contacts.instagram}`} className={style.sites}><img src={instagram}/></a> }
                    {props.contacts.facebook && <a href={`${props.contacts.facebook}`} className={style.sites}><img src={facebook}/></a>}
                   </div>
                </div>
            </div>

        </div>
    );
};


export default (withRouter)(Sidebar);
