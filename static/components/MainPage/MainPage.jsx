import React, {Component} from 'react';
import s from './MainPage.module.css';
import SearchContent from "./SearchContent/SearchContent";
import Footer from "../Footer/Footer";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeMainPage} from "../../redux/reducers/mainPage-reducer";
import Preloader from "../Common/Preloader/Preloader";
import Hobbies from "../Hobbies/Hobbies";
import {withRouter} from 'react-router-dom';
import {Redirect} from "react-router-dom";

class MainPage extends React.Component {
    componentDidMount() {
        let hobbyType = this.props.match.params.category;
        this.props.initializeMainPage(hobbyType);
    }
    render() {
        if (!this.props.initializedMainPage) {
            return <Preloader />;
        }
        if(this.props.providerIsAuth) return <Redirect to={"/provider/cabinet"} />;
        return (<div>
            <div className={s.background}> </div>
            {this.props.isSubmit ? <Hobbies/> : <SearchContent/>}
            <Footer/>
        </div>);
    }
}

const mapStateToProps = (state) => ({
    initializedMainPage: state.mainPage.initializedMainPage,
    isSubmit: state.mainPage.isSubmit,
    providerIsAuth: state.providerCabinet.providerIsAuth
});

export default compose(connect(mapStateToProps, {initializeMainPage}), withRouter)(MainPage);