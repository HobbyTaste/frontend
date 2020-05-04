import { Link, withRouter } from 'react-router-dom';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setCategoryFromNavigation } from '../../redux/actions/searchActions';

class LinkCategory extends React.Component {

    constructor(props) {
        super(props);
        this.handleLink = this.handleLink.bind(this);
    }

    handleLink(event) {
        this.props.setCategory(this.props.url);
    }

    render() {
        return (<Link onClick={this.handleLink} className={this.props.className} to={`/search/${this.props.url}`}>
            {this.props.label}</Link>);
    }
};


const mapDispatchToProps = (dispatch) => ({
    setCategory: (category) => dispatch(setCategoryFromNavigation(category)),
});

export default compose(connect(null, mapDispatchToProps), withRouter)(LinkCategory);
