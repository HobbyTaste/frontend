import React, { Component } from 'react';
import style from './FilterSidebar.css';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import { categoryHobby, filterHobby } from '../../../redux/actions/searchActions';

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
            <p className={style.flag}>{props.label}</p><Checkbox onChange={props.onChange} style={classes.root} size={'small'} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}/>
        </div>
    )
};


class FilterSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.handleParking = this.handleParking.bind(this);
        this.handleBeginner = this.handleBeginner.bind(this);
        this.handleChild = this.handleChild.bind(this);
        this.handleEquipment = this.handleEquipment.bind(this);

    }

    handleParking(event) {
        this.props.filteredHobby(this.props.hobbiesShow, 'parking', event.target.checked);
    }

    handleChild(event) {
        this.props.filteredHobby(this.props.hobbiesShow, 'child', event.target.checked);
    }

    handleBeginner(event) {
        this.props.filteredHobby(this.props.hobbiesShow, 'beginner', event.target.checked);
    }

    handleEquipment(event) {
        this.props.filteredHobby(this.props.hobbiesShow, 'equipment', event.target.checked);
    }


    render() {
        return (
            <div className={style.container}>
                <p className={style.label}>Фильтры:</p>
               <LabelFilter label={"Парковка"}  onChange={this.handleParking} />
                <LabelFilter label={"Новичкам"} onChange={this.handleBeginner}/>
                <LabelFilter label={"Детям"} onChange={this.handleChild}/>
                <LabelFilter label={"Экипировка"} onChange={this.handleEquipment}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    hobbiesShow: state.searchPage.hobbiesShow,
});

const mapDispatchToProps = (dispatch) => ({
    filteredHobby: (hobbies, filter, isChecked) => dispatch(filterHobby(hobbies, filter, isChecked)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterSidebar);
