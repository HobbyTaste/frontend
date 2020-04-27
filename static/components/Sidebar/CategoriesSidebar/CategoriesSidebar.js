import React, { Component} from 'react';
import style from './CategoriesSidebar.css';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Category from './Category';
import {categories} from '../../../utils/constant';

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
        const classes = useStyles();
       const onLink=this.handleLink;
        return (
            <div className={style.container}>
                <p className={style.label}>Категории:</p>
                <ul className={style.list}>
                    {
                        categories.slice(0, this.state.countShow)
                            .map(function (item, index) {
                                return <li key={index}>
                                    <Category label={item.label} action={onLink} url={item.url} count={1}/>
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
    hobbiesShow: state.searchPage.hobbiesShow,
});

export default compose(connect(mapStateToProps, null), withRouter)(CategoriesSidebar);
