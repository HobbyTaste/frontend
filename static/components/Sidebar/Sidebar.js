import React, {Component} from 'react';
import style from './Sidebar.css';

import {Link} from 'react-router-dom';


const Sidebar = (props) => {
    return (
        <div className={style.container}>
           {/*<div className={style.calendar}></div>*/}
            <div className={style.advert}/>
        </div>
    );
};

export default Sidebar;
