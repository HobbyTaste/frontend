import React, {Component} from 'react';
import {connect} from "react-redux";
import UserCabinet from "./UserCabinet";

const mapStateToProps = (state) => {
    return {
        email: state.auth.email,
        name: state.auth.name,
        avatar: state.auth.avatar,
        myHobbyCards: state.userCabinet.myHobbyCards
    }
};

export default connect(mapStateToProps)(UserCabinet);