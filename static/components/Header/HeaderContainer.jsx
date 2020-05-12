import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout, setIsUserInCabinet} from "../../redux/actions/userActions";
import {logoutProvider} from '../../redux/actions/providerActions';

const mapStateToProps = (state) => ({
    isProviderAuth: state.providerCabinet.providerIsAuth,
    isUserAuth: state.userCabinet.isAuth,
    name: state.userCabinet.name || state.providerCabinet.name,
});

export default connect(mapStateToProps, {logout, logoutProvider, setIsUserInCabinet})(Header);
