import style from './CategoriesSidebar.css';
import { Link, withRouter } from 'react-router-dom';
import React from 'react';
import { getLabelByUrlCategory, setCategory } from '../../../redux/actions/searchActions';
import { compose } from 'redux';
import { connect } from 'react-redux';

const Category = (props) => {
    const handleLink = (event) => {
        props.onCLick(props.url);
    };
    let classes = style.text;
    if (props.count == 0) {
        classes += ' ' + style.textDisable;
    }
    return (
        <Link to={`/search/${props.url}`} onClick={handleLink}>
            <div className={style.option}>
                <p className={classes}>{getLabelByUrlCategory(props.url)}</p><p
                className={classes}>{props.count}</p>
            </div>
        </Link>
    );
};


export default compose(withRouter)(Category);
