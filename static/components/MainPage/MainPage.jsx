import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, Redirect } from 'react-router-dom';
import style from './MainPage.module.css';
import { initializeMainPage, changeHobbyForProvider, changeHobbyForUser } from '../../redux/actions/mainPageActions';
import Preloader from '../Common/Preloader/Preloader';
import CardSlider from './CardSlider';
import Content from '../SearchPage/Content/Content';
import {
    changeSearchForProvider,
    changeSearchForUser,
    initializeSearchPage,
    unsetCategory
} from '../../redux/actions/searchActions';


class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeSubscribes = this.handleChangeSubscribes.bind(this);
    }
    componentDidMount() {
        this.props.initializeMainPage();
    }

    handleChangeSubscribes(event, idHobby){
        console.log(idHobby);
        if (this.props.isUserAuth){
            this.props.changeHobbyForUser(idHobby, this.props.word);
        }
        else{
            this.props.changeHobbyForProvider(idHobby, this.props.word);
        }
    }
    render() {
        if (!this.props.initializedMainPage) {
            return <Preloader />;
        }
        return (<div className={style.background}>
            <div className={style.cardContainer}>
                <CardSlider hobbies={this.props.hobbiesWidget} idPerson = {this.props.id} onClick={this.handleChangeSubscribes} isUserAuth={this.props.isUserAuth} isProviderAuth={this.props.isProviderAuth}/>
            </div>
            <div className={style.header}>Топ</div>
            <div className={style.slotContainer}>
                <div className="center">
                    <Content hobbies={this.props.hobbiesTop} isUserAuth={this.props.isUserAuth}
                              isProviderAuth={this.props.isProviderAuth} idUser={this.props.id} onClick={this.handleChangeSubscribes}/>
                </div>
            </div>
        </div>);
    }
}

const mapStateToProps = (state) => ({
    initializedMainPage: state.mainPage.initializedMainPage,
    isSubmit: state.mainPage.isSubmit,
    hobbiesTop: state.mainPage.hobbiesTop,
    hobbiesWidget: state.mainPage.hobbiesWidget,
    hobbiesPoster: state.mainPage.hobbiesPoster,
    id: state.userCabinet.id || state.providerCabinet.id,
    isUserAuth: state.userCabinet.isAuth,
    isProviderAuth: state.providerCabinet.providerIsAuth,
});
const mapDispatchToProps = (dispatch) => ({
    initializeMainPage: () => dispatch(initializeMainPage()),
    changeHobbyForUser: (hobbies) => dispatch(changeHobbyForUser(hobbies)),
    changeHobbyForProvider: (hobbies) => dispatch( changeHobbyForProvider(hobbies)),

});
export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(MainPage);
