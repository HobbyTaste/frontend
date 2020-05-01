import React, {Component} from 'react';
import style from './ProviderCabinet.module.css';
import {DialogAddHobbyForm} from "./DialogAddHobbyForm/DialogAddHobbyForm";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {initializeProviderCabinet, logoutProvider} from "../../redux/actions/providerActions";
import Preloader from "../Common/Preloader/Preloader";
import {AddHobbyCard} from "./AddHobbyCard/AddHobbyCard";
import UserAvatar from "../UserCabinet/UserInfoCard/UserAvatar/UserAvatar";
import ProviderInfo from "./ProviderInfo/ProviderInfo";

class ProviderCabinet extends React.Component {
    componentDidMount() {
        this.props.initializeProviderCabinet(true);
    }
    render() {
        if (!this.props.providerInitialized) {
            return <Preloader/>
        }
        if (!this.props.providerIsAuth) return <Redirect to={"/"}/>;
        const providerHobbies = this.props.providerHobbies.map(hobby =>
            <AddHobbyCard organization={hobby.label} image={hobby.avatar}
                          telephone={hobby.phone} email={hobby.email}
                          metro={hobby.metroStation} address={hobby.address}
                          information={hobby.description}
                            category={hobby.category}/>
        );
        return (<div>
            <div className={style.background}>
                <div className={style.layout}>
                    <div className={style.info}>
                        <UserAvatar url={this.props.avatar}/>
                        <ProviderInfo name={this.props.name} email={this.props.email}
                                      phone={this.props.phone} info={this.props.info}/>
                    </div>
                    <div className={style.hobbiesBlock}>
                        <div className={style.title}>Мои хобби</div>
                        <div className={style.scrollBlock}>
                            <div className={style.blockForCards}>
                                {providerHobbies}
                                <div className={style.formContainer}>
                                    <DialogAddHobbyForm/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

let mapStateToProps = (state) => ({
    // providerIsAuth: state.providerCabinet.providerIsAuth,
    providerIsAuth: true,
    name: state.providerCabinet.name,
    email: state.providerCabinet.email,
    phone: state.providerCabinet.phone,
    info: state.providerCabinet.info,
    avatar: state.providerCabinet.avatar,
    password: state.providerCabinet.password,
    providerInitialized: state.providerCabinet.providerInitialized,
    providerHobbies: state.providerCabinet.providerHobbies
});

export default connect(mapStateToProps, {logoutProvider, initializeProviderCabinet})(ProviderCabinet);
