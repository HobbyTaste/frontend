import React, {Component} from 'react';
import {connect} from "react-redux";
import HobbiesContent from "./HobbiesContent";
import {addNewHobby} from "../../redux/actions/userActions";
import {withRouter, Redirect} from 'react-router-dom';
import {compose} from "redux";
import {initializeHobbiesPage} from "../../redux/reducers/hobbiesPage-reducer";
import Preloader from "../Common/Preloader/Preloader";

class HobbiesContentContainer extends React.Component {
    componentDidMount() {
        const type = this.props.match.params.type;
        const metro = this.props.match.params.metro;
        this.props.initializeHobbiesPage(type, metro);
    }
    render() {
        if(!this.props.initializedHobbiesPage) {
            return <Preloader />
        }
        if(this.props.providerIsAuth) return <Redirect to={"/provider/cabinet"} />;
        return <div>
            <HobbiesContent hobbyCards={this.props.hobbies}
                            addNewHobby={this.props.addNewHobby}
                            isAuth={this.props.isAuth}
                            userId={this.props.userId}
                            type={this.props.match.params.type}
                            hobbiesMetro={this.props.match.params.metro}
                            addingInProgress={this.props.addingInProgress}
                            />
        </div>
    }
}

let mapStateToProps = (state) => {
    return {
        hobbies: state.hobbiesPage.hobbyCards,
        initializedHobbiesPage: state.hobbiesPage.initializedHobbiesPage,
        isAuth: state.userCabinet.isAuth,
        userId: state.userCabinet.id,
        addingInProgress: state.hobbiesPage.addingInProgress,
        providerIsAuth: state.providerCabinet.providerIsAuth
    }
};

export default compose(connect(mapStateToProps, {addNewHobby, initializeHobbiesPage}), withRouter)(HobbiesContentContainer)
