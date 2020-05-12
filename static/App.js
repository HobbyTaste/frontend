import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MainPage from './components/MainPage/MainPage';
import Hobbies from './components/Hobbies/Hobbies';
import { initializeApp } from './redux/reducers/app-reducer';
import Navigation from './components/Navigation/Navigation';
import HobbyCard from './components/HobbyCard/HobbyCard';
import SearchPage from './components/SearchPage/SearchPage';
import ProviderCabinet from './components/ProviderCabinet/ProviderCabinet';
import HeaderContainer from './components/Header/HeaderContainer';
import ProviderHeaderContainer from './components/ProviderHeader/ProviderHeaderContainer';
import Preloader from './components/Common/Preloader/Preloader';
import UserCabinet from './components/UserCabinet/UserCabinet';
import style from './App.module.css';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';
import UserCabinetNavigation from './components/UserCabinet/UserCabinetNavigation';
import UserCabinetHobbies from './components/UserCabinet/UserCabinetHobbies';
import ProviderCabinetNavigation from './components/ProviderCabinet/ProviderCabinetNavigation';
import ProviderHobby from './components/ProviderCabinet/ProviderHobby/ProviderHobby';
import ProviderOwnHobbies from './components/ProviderCabinet/ProviderOwn/ProviderOwnHobbies';
import AddHobby from './components/ProviderCabinet/AddHobby';
import ProviderMonetization from './components/ProviderCabinet/ProviderMonetization/ProviderMonetization';
import EditHobby from './components/ProviderCabinet/EditHobby';

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>;
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
                            <Route exact path="/hobby/card" render={() => <Navigation/>}/>
                            <Route exact path="/user/cabinet" render={() => <UserCabinetNavigation isActive={0}/>} />
                            <Route exact path="/user/cabinet/hobbies" render={() => <UserCabinetNavigation isActive={1}/>} />
                            <Route exact path="/provider/cabinet" render={() => <ProviderCabinetNavigation isActive={0}/>}/>
                            <Route exact path="/provider/cabinet/own" render={() => <ProviderCabinetNavigation isActive={1}/>}/>
                            <Route exact path="/provider/cabinet/monetization" render={() => <ProviderCabinetNavigation isActive={2}/>}/>
                            <Route exact path="/provider/cabinet/hobbies" render={() => <ProviderCabinetNavigation isActive={3}/>}/>
                            <Route exact path="/provider/cabinet/add_hobby" render={() => <ProviderCabinetNavigation isActive={4}/>}/>
                            <Route exact path="/provider/cabinet/edit_hobby" render={() => <ProviderCabinetNavigation isActive={4}/>}/>
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
                            <Route exact path="/provider/cabinet/own" render={() => <ProviderOwnHobbies/>}/>
                            <Route exact path="/provider/cabinet/monetization" render={() => <ProviderMonetization/>}/>
                            <Route exact path="/provider/cabinet/hobbies" render={() => <ProviderHobby/>}/>
                            <Route exact path="/provider/cabinet/add_hobby" render={() => <AddHobby/>}/>
                            <Route exact path="/provider/cabinet/edit_hobby" render={() => <EditHobby/>}/>
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
    initialized: state.app.initialized,
});

export default compose(withRouter, connect(mapStateToProps, { initializeApp }))(App);
