import React, { Component } from 'react';
import style from './FilterSidebar.css';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import { setFilter} from '../../../redux/actions/searchActions';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const useStyles = theme => ({
    root: {
        display: 'flex',
        padding: '0px',
        color: '#034488',
        width:'18px',
        height: '18px',
    },
    checked: {
        background: '#034488',
        color: '#034488',
    },

});

const LabelFilter = (props) => {
    const classes = useStyles();
    return (
        <div className={style.option}>
            <p className={style.flag}>{props.label}</p>
            <Checkbox onChange={props.onChange} style={classes.root} size={'small'} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}/>
        </div>
    )
};


class FilterSidebar extends React.Component {
    constructor(props) {
        super(props);

        this.handleFlag = this.handleFlag.bind(this);
    }

    handleFlag(event, flag) {

        const a = this.props.filtersArray;
        if (event.target.checked){
            const newArray =[...a, flag];
            this.props.filteredHobby(newArray);
        }
        else{
            const index = a.indexOf(flag);
            let newArray = a.slice();
            newArray.splice(index, 1);
            this.props.filteredHobby(newArray);
        }
    }

    render() {
        if (!this.props.initialized) {
            return (<div></div>)
        }
        return (
            <div className={style.container}>
                <p className={style.label}>Фильтры:</p>
                <LabelFilter label={"Парковка"}  onChange={(e) => this.handleFlag(e, 'parking')} />
                <LabelFilter label={"Новичкам"} onChange={(e) => this.handleFlag(e, 'beginner')}/>
                <LabelFilter label={"Детям"} onChange={(e) => this.handleFlag(e, 'child')}/>
                <LabelFilter label={"Экипировка"} onChange={(e) => this.handleFlag(e, 'equipment')}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.searchPage.initializedSearchPage,
    filtersArray: state.searchPage.filter,
});

const mapDispatchToProps = (dispatch) => ({
    filteredHobby: (filtersArray) => dispatch(setFilter(filtersArray)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(FilterSidebar);
