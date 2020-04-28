import style from './CategoriesSidebar.css';
import { Link, withRouter } from 'react-router-dom';
import React from 'react';
import { setCategory } from '../../../redux/actions/searchActions';
import { compose } from 'redux';
import { connect } from 'react-redux';

class Category extends React.Component {

    constructor(props) {
        super(props);
        this.handleLink = this.handleLink.bind(this);
    }

    handleLink(event) {
        this.props.setCategory( this.props.hobbiesShow, this.props.label);
    }

    render() {
        let classes = style.text;
        if (this.props.count === 0) {
            classes += ' ' + style.textDisable;
        }
        return (
            <Link to={`/search/${this.props.url}`} onClick={this.handleLink}>
                <div className={style.option}>
                    <p className={classes}>{this.props.label}</p><p
                    className={classes}>{this.props.count ? this.props.count : '0'}</p>
                </div>
            </Link>
        );
    }
};


const mapStateToProps = (state) => ({
    hobbiesShow: state.searchPage.hobbiesShow,
});

const mapDispatchToProps = (dispatch) => ({
    setCategory: (hobbies, category) => dispatch(setCategory(hobbies,category)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(Category);
