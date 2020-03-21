import React, {Component} from 'react';
import style from './Sidebar.css';

import {Link} from 'react-router-dom';


const Sidebar = (props) => {
    return (
        <div>
           <div className={style.calendar}></div>
            <div className={style.advert}></div>
        </div>
    );
};

export default Sidebar;
