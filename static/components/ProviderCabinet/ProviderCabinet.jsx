import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import style from './ProviderCabinet.module.css';
import { DialogAddHobbyForm } from './DialogAddHobbyForm/DialogAddHobbyForm';
import { initializeProviderCabinet, logoutProvider } from '../../redux/actions/providerActions';
import Preloader from '../Common/Preloader/Preloader';
import { AddHobbyCard } from './AddHobbyCard/AddHobbyCard';
import UserAvatar from '../UserCabinet/UserInfoCard/UserAvatar/UserAvatar';
import ProviderInfo from './ProviderInfo/ProviderInfo';
import UserInfoCard from "../UserCabinet/UserInfoCard/UserInfoCard";
import Feedback from "../HobbyCard/Feedback/Feedback";

class ProviderCabinet extends React.Component {
    componentDidMount() {
        this.props.initializeProviderCabinet(true);
    }

    render() {
        if (!this.props.providerInitialized) {
            return <Preloader/>;
        }

        if (!this.props.providerIsAuth) return <Redirect to={'/'}/>;

        // const providerHobbies = this.props.providerHobbies.map((hobby) => <AddHobbyCard organization={hobby.label} image={hobby.avatar}
        //     telephone={hobby.phone} email={hobby.email}
        //     metro={hobby.metroStation} address={hobby.address}
        //     information={hobby.description}
        //     category={hobby.category}/>);

        return (<div className={style.background}>
            <div className={style.infoContainer}>
                <ProviderInfo avatar={this.props.avatar} name={this.props.name} metro={this.props.metro}/>
            </div>
            <div className={style.feedbackHeader}>Отзывы на ваши хобби и ваши ответы на них:</div>
            <div className={style.feedbackContainer}>
                <Feedback isUserAuth={false} isProviderAuth={this.props.isProviderAuth} />
            </div>
        </div>);
    }
}

const mapStateToProps = (state) => ({
    // providerIsAuth: state.providerCabinet.providerIsAuth,
    providerIsAuth: true,
    // name: state.providerCabinet.name,
    email: state.providerCabinet.email,
    phone: state.providerCabinet.phone,
    info: state.providerCabinet.info,
    // avatar: state.providerCabinet.avatar,
    password: state.providerCabinet.password,
    providerInitialized: state.providerCabinet.providerInitialized,
    providerHobbies: state.providerCabinet.providerHobbies,

    name: 'Контора "Рога и копыта"',
    avatar: 'https://kravmaganewcastle.com.au/wp-content/uploads/2017/04/default-image-800x600.jpg',
});

export default connect(mapStateToProps, { logoutProvider, initializeProviderCabinet })(ProviderCabinet);
