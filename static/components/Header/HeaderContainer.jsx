import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/reducers/auth-reducer";
import {setSubmit} from "../../redux/reducers/mainPage-reducer";

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    avatar: state.auth.avatar
});

export default connect(mapStateToProps, {logout, setSubmit})(Header);