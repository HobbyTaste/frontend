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

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }
    render() {
            return (
                    <div className="app-wrapper">
                        <HeaderContainer/>
                        <div className="app-wrapper-content">
                            <Route exact path="/" render={() => <Categories />}/>
                            <Route exact path="/main/page" render={() => <MainPage/>}/>
                            <Route exact path="/hobbies" render={() => <Hobbies/>}/>
                            <Route exact path="/user/cabinet" render={() => <UserCabinetContainer/>}/>
                            <Route exact path="/provider/cabinet" render={() => <ProviderCabinet/>}/>
                        </div>
                    </div>
            );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

export default compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);