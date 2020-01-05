import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import Hobbies from './components/Hobbies/Hobbies'
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/reducers/app-reducer";
import UserCabinetContainer from "./components/UserCabinet/UserCabinetContainer";
import Categories from "./components/Categories/Categories";
import ProviderCabinet from "./components/ProviderCabinet/ProviderCabinet";
import HeaderContainer from "./components/Header/HeaderContainer";
import ProviderHeaderContainer from "./components/ProviderHeader/ProviderHeaderContainer";
import Preloader from "./components/Common/Preloader/Preloader";

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }
    render() {
        if(!this.props.initialized) { return <Preloader />}
            return (
                <div>
                    {this.props.providerIsAuth ? <ProviderHeaderContainer/>
                        : <HeaderContainer/>}
                    <ProviderCabinet/>
                    {/*<Route exact path="/" render={() => <Categories/>}/>
                    <Route exact path="/main/page" render={() => <MainPage/>}/>
                    <Route exact path="/hobbies" render={() => <Hobbies/>}/>
                    <Route exact path="/user/cabinet" render={() => <UserCabinetContainer/>}/>
                    <Route exact path="/provider/cabinet" render={() => <ProviderCabinet/>}/>*/}
                </div>
            );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    providerIsAuth: state.providerCabinet.providerIsAuth
});

export default compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);