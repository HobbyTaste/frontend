import React, {Component} from 'react';
import style from './HobbyCard.css';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import ImageSlider from './Image/Image'
import Button from '@material-ui/core/Button';
import InformationForm from './InformationForm/InformationForm';


const HobbyCard = (props) => {
   // if(props.providerIsAuth) return <Redirect to={"/provider/cabinet"} />;
    return (
        <div>
            <div className={style.infoContainer}>
                <div className={style.mainContainer}>
                    <div className={style.mainBlock}>
                        <div className={style.imageContainer}><ImageSlider/></div>
                        <div className={style.textContainer}><InformationForm /></div>
                    </div>
                    <div className={style.buttonContainer}>
                        <Button className={style.button}>
                            кнопка
                        </Button>
                    </div>
                    <div>
                        описание
                    </div>
                </div>
                <div className={style.panel}>
                    боковая панель
                </div>
            </div>
            <div className={style.communication}>
                //отзывы
            </div>
        </div>
       );
};

let mapStateToProps = (state) => ({
    providerIsAuth: state.providerCabinet.providerIsAuth
});

export default connect(mapStateToProps, null)(HobbyCard);
