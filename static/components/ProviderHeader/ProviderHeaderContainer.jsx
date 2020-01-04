import React from 'react';
import ProviderHeader from "./ProviderHeader";
import {connect} from "react-redux";
import {logoutProvider} from "../../redux/reducers/provider-reducer";

export default connect(null, {logoutProvider})(ProviderHeader);