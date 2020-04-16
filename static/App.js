import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import Hobbies from './components/Hobbies/Hobbies'
import { initializeApp } from './redux/reducers/app-reducer';
import Categories from './components/Categories/Categories';
import Navigation from './components/Navigation/Navigation';
import HobbyCard from './components/HobbyCard/HobbyCard';
import ProviderCabinet from './components/ProviderCabinet/ProviderCabinet';
import HeaderContainer from './components/Header/HeaderContainer';
import ProviderHeaderContainer from './components/ProviderHeader/ProviderHeaderContainer';
import Preloader from './components/Common/Preloader/Preloader';
import { connect } from 'react-redux';
import { compose } from 'redux';
import UserCabinet from './components/UserCabinet/UserCabinet';
import style from './App.module.css';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className={style.appBackground}>
                <div className={style.appWrapper}>
                    <div className={style.fixedHeader}>
                        <div className={style.appHeader}>
                            <HeaderContainer/>
                        </div>
                        <div className={style.appNavigation}>
                            <Navigation/>
                        </div>
                    </div>
                    <div className={style.appLayout}>
                        <div className={style.appSidebar}>
                            <Sidebar/>
                        </div>
                        <div className={style.appWrapperContent}>
                            <Route exact path="/" render={() => <MainPage/>}/>
                            <Route path="/hobbies/:type?/:metro?" render={() => <Hobbies/>}/>
                            <Route exact path="/hobby/card" render={() => <HobbyCard/>}/>
                            <Route exact path="/user/cabinet" render={() => <UserCabinet/>}/>
                            <Route exact path="/provider/cabinet" render={() => <ProviderCabinet/>}/>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    providerIsAuth: state.providerCabinet.providerIsAuth,
    isAuth: state.auth.isAuth,
    inUserCabinet: state.auth.inUserCabinet
});

export default compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);
