import React, {Component} from 'react';
import style from './Footer.module.css';
import Contacts from "./Contacts/Contacts";
import Feedback from "./Feedback/Feedback";

const Footer = (props) => {
    return (
        <footer className={style.footer}>
            <div className={style.contacts}>
                Студенческий проект “HobbyTaste”.<br/>
                Инновационный практикум, весна 2020.
            </div>
            <div className={style.contacts}>
                Наши контакты: <br/>
                Руководитель проекта: Сикалов Никита <br/>
                Email: sikalov.ns@phystech.edu
            </div>
        </footer>
    );
};

export default Footer;
