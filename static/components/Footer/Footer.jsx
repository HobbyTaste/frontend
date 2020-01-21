import React, {Component} from 'react';
import style from './Footer.module.css';
import Contacts from "./Contacts/Contacts";
import Feedback from "./Feedback/Feedback";

const Footer = (props) => {
    return (
            <footer className={style.footer}>
                <Contacts/>
                <Feedback/>
            </footer>
    );
};

export default Footer;