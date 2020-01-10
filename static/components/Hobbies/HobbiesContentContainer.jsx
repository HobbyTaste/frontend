import React, {Component} from 'react';
import {connect} from "react-redux";
import HobbiesContent from "./HobbiesContent";
import {addNewHobby} from "../../redux/reducers/auth-reducer";

class HobbiesContentContainer extends React.Component {
    render() {
        return <div>
            <HobbiesContent hobbyCards={this.props.hobbies}
                            addNewHobby={this.props.addNewHobby}
                            isAuth={this.props.isAuth}
                            userId={this.props.userId}/>
        </div>
    }
}

let mapStateToProps = (state) => {
    return {
        hobbies: state.mainPage.hobbies,
        isAuth: state.auth.isAuth,
        userId: state.auth.id
    }
};

export default connect(mapStateToProps, {addNewHobby})(HobbiesContentContainer)