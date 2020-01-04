import React, {Component} from 'react';
import style from './ProviderCabinet.module.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {Link} from 'react-router-dom';
import {DialogAddHobbyForm} from "./DialogAddHobbyForm/DialogAddHobbyForm";
import ProviderHeader from "../ProviderHeader/ProviderHeader";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const ProviderCabinet = (props) => {
   // debugger;
    if(!props.providerIsAuth) return <Redirect to={"/"} />;
    return (<div>
        <ProviderHeader/>
        <div className={style.background}>
            <div className={style.layout}>
                <div className={style.info}>
                    <div className={style.imgWrapper}>
                        <div className={style.imgContainer}>
                            <div className={style.img} style={{backgroundImage: `url("${props.avatar}")`}}>
                            </div>
                        </div>
                    </div>
                    <div>
                        {props.name}
                    </div>
                    <div>
                        {props.name}
                    </div>
                    <div>
                        {props.email}
                    </div>
                    <div>
                        {props.phone}
                    </div>
                    <div>
                        {props.info}
                    </div>

                </div>
                <div className={style.hobbiesBlock}>
                    <div className={style.title}>Мои хобби</div>
                    <DialogAddHobbyForm/>
                </div>
            </div>
        </div>
    </div>);
};

let mapStateToProps = (state) => ({
    providerIsAuth: state.providerCabinet.providerIsAuth,
    name: state.providerCabinet.name,
    email: state.providerCabinet.email,
    phone: state.providerCabinet.phone,
    info: state.providerCabinet.info,
    avatar: state.providerCabinet.avatar,
});

export default connect(mapStateToProps, null)(ProviderCabinet);