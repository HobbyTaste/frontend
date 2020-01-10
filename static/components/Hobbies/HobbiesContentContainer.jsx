import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    setHobbyCards,
    setCurrentPage,
    setTotalHobbiesCount,
    toggleIsFetching
} from "../../redux/reducers/hobbiesPage-reducer";
import HobbiesContent from "./HobbiesContent";
import {addNewHobby} from "../../redux/reducers/provider-reducer";

class HobbiesContentContainer extends React.Component {
    render() {
        return <div>
            <HobbiesContent hobbyCards={this.props.hobbies}
                            addMyHobby={this.props.addMyHobby}
                            isAuth={this.props.isAuth}
                            addingInProgress={this.props.addingInProgress}/>
        </div>
    }
}

let mapStateToProps = (state) => {
    return {
        hobbies: state.mainPage.hobbies,
        isAuth: state.auth.isAuth,
        addingInProgress: state.hobbiesPage.addingInProgress,
        isFetching: state.hobbiesPage.isFetching
    }
};

export default connect(mapStateToProps, {addNewHobby})(HobbiesContentContainer)