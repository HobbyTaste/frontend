import React, {Component} from 'react';
import s from './MainPage.module.css';
import SearchContent from "./SearchContent/SearchContent";
import Footer from "../Footer/Footer";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeMainPage} from "../../redux/reducers/mainPage-reducer";
import Preloader from "../Common/Preloader/Preloader";
import Hobbies from "../Hobbies/Hobbies";

class MainPage extends React.Component {
    componentDidMount() {
        this.props.initializeMainPage();
    }
    render() {
        if (!this.props.initializedMainPage) {
            return <Preloader />;
        }
        return (<div>
            <div className={s.background}> </div>
            {this.props.isSubmit ? <Hobbies/> : <SearchContent/>}
            <Footer/>
        </div>);
    }
}

const mapStateToProps = (state) => ({
    initializedMainPage: state.mainPage.initializedMainPage,
    isSubmit: state.mainPage.isSubmit
});

export default compose(connect(mapStateToProps, {initializeMainPage}))(MainPage);