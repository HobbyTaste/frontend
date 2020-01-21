import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import Hobbies from './components/Hobbies/Hobbies'
import {initializeApp} from './redux/reducers/app-reducer';
import Categories from './components/Categories/Categories';
import ProviderCabinet from './components/ProviderCabinet/ProviderCabinet';
import HeaderContainer from './components/Header/HeaderContainer';
import ProviderHeaderContainer from './components/ProviderHeader/ProviderHeaderContainer';
import Preloader from './components/Common/Preloader/Preloader';
import {connect} from 'react-redux';
import {compose} from 'redux';
import UserCabinet from './components/UserCabinet/UserCabinet';
import style from './App.module.css';
import Footer from "./components/Footer/Footer";

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className={style.appWrapper}>
                <div className={style.appHeader}>
                    {this.props.providerIsAuth ? <ProviderHeaderContainer/>
                        : <HeaderContainer/>}
                </div>
                <div className={style.appWrapperContent}>
                    <Route exact path="/" render={() => <Categories/>}/>
                    <Route path="/search/:category?" render={() => <MainPage/>}/>
                    <Route path="/hobbies/:type?/:metro?" render={() => <Hobbies/>}/>
                    <Route exact path="/user/cabinet" render={() => <UserCabinet/>}/>
                    <Route exact path="/provider/cabinet" render={() => <ProviderCabinet/>}/>
                </div>
                <div className={style.appFooter}>
                    <Footer/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    providerIsAuth: state.providerCabinet.providerIsAuth
});

export default compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);