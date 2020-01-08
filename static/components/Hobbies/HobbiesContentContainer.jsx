import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    setHobbyCards,
    setCurrentPage,
    setTotalHobbiesCount,
    toggleIsFetching
} from "../../redux/reducers/hobbiesPage-reducer";
import HobbiesContent from "./HobbiesContent";
import {addMyHobby} from "../../redux/reducers/user-reducer";

class HobbiesContentContainer extends React.Component {
    render() {
        return <div>
            <HobbiesContent hobbyCards={this.props.hobbies}
                            addMyHobby={this.props.addMyHobby}
                            isAuth={this.props.isAuth}/>
        </div>
    }
}

let mapStateToProps = (state) => {
    return {
        hobbies: state.mainPage.hobbies,
        isAuth: state.auth.isAuth
    }
};

export default connect(mapStateToProps, {addMyHobby})(HobbiesContentContainer)