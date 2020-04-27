import React, {Component} from 'react';
import style from './Sidebar.css';
import Link from 'react-router-dom';
import advert from './advert1.png'
import { connect } from 'react-redux';
import FilterSidebar from './FilterSidebar/FilterSidebar';
import CategoriesSidebar from './CategoriesSidebar/CategoriesSidebar';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={style.container}>
                {this.props.isSearch ?
                    <div className={style.featureContainer}>
                        <FilterSidebar />
                        <CategoriesSidebar />
                    </div>
                    :
                <div className={style.advert}>
                    <img className={style.image} src={advert}/>
                </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isSearch: state.searchPage.isInSearchPage,
});

export default connect(mapStateToProps, null)(Sidebar);
