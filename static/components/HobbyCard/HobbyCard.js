import React, {Component} from 'react';
import style from './HobbyCard.css';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const HobbyCard = (props) => {
   // if(props.providerIsAuth) return <Redirect to={"/provider/cabinet"} />;
    return (
        <div>
            <div className={style.infoContainer}>
                <div className={style.gridBlock}>
                    <div>картинка</div>
                    <div>информация</div>
                    <div>описание картинки</div>
                    <div>кнопочка</div>
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
