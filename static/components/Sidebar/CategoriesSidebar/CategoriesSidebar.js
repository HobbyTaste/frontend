import React, { Component} from 'react';
import style from './CategoriesSidebar.css';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Category from './Category';
import {categories} from '../../../utils/constant';
import { countHobbyIn } from '../../../utils/functions';

const useStyles = theme => ({
    button: {
        display: 'flex',
        alignItems: 'center',
        margin: '0',
        padding: '12px 0px',
    },
});

class CategoriesSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countShow: 3,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({ countShow: categories.length });
    }

    render() {
        if (!this.props.initialized){
        return <div></div>
        }
        const classes = useStyles();
       const onLink=this.handleLink;
        const countDict = countHobbyIn(this.props.hobbiesRecieved);
        let sortedCategories = Object.keys(countDict).map(function(key) {
            return [key, countDict[key]];
        });
        sortedCategories.sort(function(first, second) {
            return second[1] - first[1];
        });
        return (
            <div className={style.container}>
                <p className={style.label}>Категории:</p>
                <ul className={style.list}>
                    {
                        sortedCategories.slice(0, this.state.countShow)
                            .map(function (item, index) {
                                return <li key={index}>
                                    <Category action={onLink} url={item[0]} count={[item[1]]}/>
                                </li>;
                            })
                    }
                    {(this.state.countShow !== categories.length) &&
                    <li>
                        <Button style={classes.button} onClick={this.handleClick}>
                            <p className={style.text}>Показать ещё...</p>
                        </Button>
                    </li>}
                </ul>
            </div>
        );
}
}

const mapStateToProps = (state) => ({
    hobbiesRecieved: state.searchPage.hobbiesToSearch,
    initialized: state.searchPage.initializedSearchPage,
});

export default compose(connect(mapStateToProps, null), withRouter)(CategoriesSidebar);
