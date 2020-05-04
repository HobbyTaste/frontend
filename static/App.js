import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import Hobbies from './components/Hobbies/Hobbies'
import { initializeApp } from './redux/reducers/app-reducer';
import Navigation from './components/Navigation/Navigation';
import HobbyCard from './components/HobbyCard/HobbyCard';
import SearchPage from './components/SearchPage/SearchPage';
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
import UserCabinetNavigation from './components/UserCabinet/UserCabinetNavigation';
import UserCabinetHobbies from './components/UserCabinet/UserCabinetHobbies';

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
                            <Route exact path="/" render={() => <Navigation/>}/>
                            <Route path="/search/:category?" render={() => <Navigation/>}/>
                            <Route exact path="/hobby/card/:id" render={() => <Navigation/>}/>
                            <Route exact path="/user/cabinet" render={() => <UserCabinetNavigation isMainPage={true}/>} />
                            <Route exact path="/user/cabinet/hobbies" render={() => <UserCabinetNavigation isMainPage={false}/>} />
                            <Route exact path="/provider/cabinet" render={() => <UserCabinetNavigation/>}/>
                        </div>
                    </div>
                    <div className={style.appLayout}>
                        <div className={style.appSidebar}>
                            <Sidebar/>
                        </div>
                        <div className={style.appWrapperContent}>
                            <Route exact path="/" render={() => <MainPage/>}/>
                            <Route exact path="/hobby/card/:id" render={() => <HobbyCard/>}/>
                            <Route exact path="/user/cabinet" render={() => <UserCabinet/>}/>
                            <Route exact path="/user/cabinet/hobbies" render={() => <UserCabinetHobbies/>}/>
                            <Route exact path="/provider/cabinet" render={() => <ProviderCabinet/>}/>
                            <Route exact path="/search/:category?" render={(category) => <SearchPage category={category}/>}/>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

export default compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);
