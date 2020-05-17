import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import style from "./ProviderCabinet.module.css";
import { DialogAddHobbyForm } from "./DialogAddHobbyForm/DialogAddHobbyForm";
import { initializeProviderCabinet, setIsProviderInCabinet } from "../../redux/actions/providerActions";
import Preloader from "../Common/Preloader/Preloader";
import { AddHobbyCard } from "./AddHobbyCard/AddHobbyCard";
import UserAvatar from "../UserCabinet/UserInfoCard/UserAvatar/UserAvatar";
import ProviderInfo from "./ProviderInfo/ProviderInfo";
import UserInfoCard from "../UserCabinet/UserInfoCard/UserInfoCard";
import Feedback from "../HobbyCard/Feedback/Feedback";
import CommentsList from "../HobbyCard/Feedback/CommentsList";

class ProviderCabinet extends React.Component {
    componentDidMount() {
        this.props.initializeProviderCabinet(true);
    }

    componentWillUnmount() {
        this.props.setIsProviderInCabinet(false);
    }

    render() {
        if (!this.props.providerInitialized) {
            return <Preloader />;
        }

        if (!this.props.providerIsAuth) return <Redirect to={"/"} />;

        return (
            <div className={style.background}>
                <div className={style.infoContainer}>
                    <ProviderInfo avatar={this.props.avatar} name={this.props.name} metro={this.props.metro} />
                </div>
                <div className={style.feedbackHeader}>Отзывы на ваши хобби и ваши ответы на них:</div>
                <CommentsList comments={this.props.comments.commentsInfo || []} isProvider={true} isOwner={true}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    providerIsAuth: state.providerCabinet.providerIsAuth,
    providerInitialized: state.providerCabinet.providerInitialized,
    name: state.providerCabinet.name,
    email: state.providerCabinet.email,
    phone: state.providerCabinet.phone,
    info: state.providerCabinet.info,
    avatar: state.providerCabinet.avatar,
    comments: state.providerCabinet.comments,
    providerHobbies: state.providerCabinet.ownHobbies,
});

export default connect(mapStateToProps, { initializeProviderCabinet, setIsProviderInCabinet })(ProviderCabinet);
