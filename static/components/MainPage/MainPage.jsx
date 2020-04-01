import React, {Component} from 'react';
import style from './MainPage.module.css';
import SearchContent from "./SearchContent/SearchContent";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeMainPage} from "../../redux/reducers/mainPage-reducer";
import Preloader from "../Common/Preloader/Preloader";
import {withRouter, Redirect} from 'react-router-dom';

class MainPage extends React.Component {
    componentDidMount() {
        let hobbyType = this.props.match.params.category;
        this.props.initializeMainPage(hobbyType);
    }
    render() {
        if (!this.props.initializedMainPage) {
            return <Preloader />;
        }
        if(this.props.providerIsAuth) {
            return <Redirect to={"/provider/cabinet"} />;
        }
        return (<div>
            <div className={style.background}> </div>
                <SearchContent/>
        </div>);
    }
}

const mapStateToProps = (state) => ({
    initializedMainPage: state.mainPage.initializedMainPage,
    isSubmit: state.mainPage.isSubmit,
    providerIsAuth: state.providerCabinet.providerIsAuth
});

export default compose(connect(mapStateToProps, {initializeMainPage}), withRouter)(MainPage);
