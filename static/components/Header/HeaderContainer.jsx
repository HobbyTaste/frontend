import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout, setIsUserInCabinet} from "../../redux/actions/userActions";

const mapStateToProps = (state) => ({
    isAuth: state.userCabinet.isAuth || state.providerCabinet.providerIsAuth,
    name: state.userCabinet.name || state.providerCabinet.name,
});

export default connect(mapStateToProps, {logout, setIsUserInCabinet})(Header);
