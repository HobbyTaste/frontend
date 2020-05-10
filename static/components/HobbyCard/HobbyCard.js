import React, { Component } from 'react';
import style from './HobbyCard.css';
import feedStyle from './Feedback/Feedback.css';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Feedback from './Feedback/Feedback';
import Sidebar from './Sidebar/Sidebar';
import Slider from './Image/Slider';
import ButtonAction from './ActionButton';
import InformationBlock from './InformationForm/InformationForm';
import {
    addHobbyForUser,
    changeHobbyForProvider,
    changeHobbyForUser,
    deleteHobbyForUser
} from '../../redux/actions/hobbyActions';
import { addHobbyForProvider, deleteHobbyForProvider } from '../../redux/actions/providerActions';
import { isInArray } from '../../utils/functions';
import { initializeHobbyPage } from '../../redux/actions/hobbyActions';
import Preloader from '../Common/Preloader/Preloader';
import { compose } from 'redux';


class HobbyCard extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeMyHobby = this.handleChangeMyHobby.bind(this);
    }
    componentDidMount() {
        this.props.initialize(this.props.match.params.id);
    }

    handleChangeMyHobby(event) {
        if (this.props.isUserAuth) {
            this.props.onChangeUserHobby(this.props.match.params.id);
        } else {
            this.props.onChangeProviderHobby(this.props.match.params.id);
        }
    }


    render() {
        console.log("id");
        console.log(this.props.id);
        if (!this.props.initializedPage){
            return <Preloader/>
        }
        const isOwner = (this.props.id === this.props.hobbyInfo.owner);
        return (
            <div>
                <div className={style.infoContainer}>
                    <div className={style.mainContainer}>
                        <div className={style.mainBlock}>
                            <div className={style.imageContainer}><Slider images ={this.props.hobbyInfo.photos}/></div>
                            <div className={style.textContainer}>
                                <InformationBlock hobbyInfo={this.props.hobbyInfo}/>
                                <div className={style.buttonContainer}>
                                    <ButtonAction isProviderAuth={this.props.isProviderAuth} isUserAuth={this.props.isUserAuth}
                                                  hobbyInfoId={this.props.hobbyInfo.id}
                                                  subscribers = {this.props.hobbyInfo.subscribers} id = {this.props.id}
                                                  isOwner = {isOwner}
                                                  handleChangeMyHobby={this.handleChangeMyHobby}/>
                                </div>
                            </div>
                        </div>

                        <h4 className={style.mainDescription}>
                            {this.props.hobbyInfo.description}
                        </h4>
                    </div>
                    <div className={style.panel}>
                        <Sidebar price={this.props.hobbyInfo.price} mobile={this.props.hobbyInfo.contact.mobile}
                                 website={this.props.hobbyInfo.contact.website} flag={this.props.hobbyInfo.flag}/>
                    </div>
                </div>
                <div className={style.communication}>
                    <p className={feedStyle.labelAnswer}> Отзывы:</p>
                    <Feedback comments = {this.props.hobbyInfo.comments} isOwner = {isOwner}/>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initializedPage: state.hobbyPage.initializedPage,
    id: state.userCabinet.id || state.providerCabinet.providerId,
    isUserAuth: state.userCabinet.isAuth,
    isProviderAuth: state.providerCabinet.providerIsAuth,

    isPageInitialized: state.hobbyPage.initialized,
    hobbyInfo: {
        subscribers: state.hobbyPage.subscribers.concat(state.hobbyPage.providerSubscribers),
        photos: state.hobbyPage.photos,
        owner: state.hobbyPage.owner,
        comments: state.hobbyPage.comments,
        id: state.hobbyPage.id,
        label: state.hobbyPage.label,
        metro: state.hobbyPage.metro,
        timeTable: state.hobbyPage.timeTable,
        equipment: state.hobbyPage.equipment,
        address: state.hobbyPage.address,
        comfortable: state.hobbyPage.comfortable,
        specialConditions: state.hobbyPage.specialConditions,
        description: state.hobbyPage.description,
        price: state.hobbyPage.price,
        flag: state.hobbyPage.flag,
        contact: state.hobbyPage.contact,
        category: state.hobbyPage.category,
    },
});
const mapDispatchToProps = (dispatch) => ({
    onChangeUserHobby: (idHobby) => dispatch(changeHobbyForUser(idHobby)),
    onChangeProviderHobby: (idHobby) => dispatch(changeHobbyForProvider(idHobby)),
    initialize: (idHobby) => dispatch(initializeHobbyPage(idHobby)),
});


export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(HobbyCard);
