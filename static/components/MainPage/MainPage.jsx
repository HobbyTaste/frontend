import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, Redirect } from 'react-router-dom';
import style from './MainPage.module.css';
import { initializeMainPage } from '../../redux/reducers/mainPage-reducer';
import Preloader from '../Common/Preloader/Preloader';
import Slot from './Slot/Slot';
import CardSlider from './CardSlider';
import Card from './Card/Card';
import Content from '../SearchPage/Content/Content';

const image = 'https://kravmaganewcastle.com.au/wp-content/uploads/2017/04/default-image-800x600.jpg';

class MainPage extends React.Component {
    componentDidMount() {
        this.props.initializeMainPage();
    }

    render() {
        if (!this.props.initializedMainPage) {
            return <Preloader />;
        }
        return (<div className={style.background}>
            <div className={style.cardContainer}>
                <CardSlider hobbies={this.props.hobbiesWidget} isUserAuth={this.props.isUserAuth} isProviderAuth={this.props.isProviderAuth}/>
            </div>
            <div className={style.header}>Топ 10 новинок</div>
            <div className={style.slotContainer}>
                <div className="center">
                    <Content hobbies={this.props.hobbiesTop} isUserAuth={this.props.isUserAuth}
                              isProviderAuth={this.props.isProviderAuth} idUser={this.props.id}/>
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
    id: state.userCabinet.userId || state.providerCabinet.providerId,
    isUserAuth: state.userCabinet.isAuth,
    isProviderAuth: state.providerCabinet.providerIsAuth,
});

export default compose(connect(mapStateToProps, { initializeMainPage }), withRouter)(MainPage);
