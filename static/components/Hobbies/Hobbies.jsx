import React, {Component} from 'react';
import HobbiesContentContainer from './HobbiesContentContainer';
import s from './Hobbies.module.css';
import Footer from "../Footer/Footer";
import HeaderContainer from "../Header/HeaderContainer";

const Hobbies = (props) => {
    return (<div>
       {/* <HeaderContainer/>*/}
               <div className={s.background}> </div>
               <HobbiesContentContainer />
               <Footer />
    </div>);
};

export default Hobbies;