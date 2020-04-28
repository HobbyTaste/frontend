import React from 'react';
import ProviderHeader from "./ProviderHeader";
import {connect} from "react-redux";
import {logoutProvider} from "../../redux/actions/providerActions";

const mapStateToProps = (state) => {
    return {
        avatar: state.providerCabinet.avatar
    }
};

export default connect(mapStateToProps, {logoutProvider})(ProviderHeader);
