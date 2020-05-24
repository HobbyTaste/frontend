import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import style from "./ProviderCabinet.module.css";
import { initializeProviderCabinet, setIsProviderInCabinet } from "../../redux/actions/providerActions";
import Preloader from "../Common/Preloader/Preloader";
import ProviderInfo from "./ProviderInfo/ProviderInfo";
import ProviderCommentsList from "./ProviderCommentsList";


function getHobbyIds(relatedIds) {
    return relatedIds ? relatedIds.map(ids => ids.hobbyId) : [];
}


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
                    <ProviderInfo avatar={this.props.avatar} name={this.props.name} email={this.props.email} phone={this.props.phone}/>
                </div>
                <div className={style.feedbackHeader}>Отзывы на ваши хобби и ваши ответы на них:</div>
                <ProviderCommentsList comments={this.props.comments.commentsInfo || []} hobbyIds={getHobbyIds(this.props.comments.commentsIds)}/>
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
