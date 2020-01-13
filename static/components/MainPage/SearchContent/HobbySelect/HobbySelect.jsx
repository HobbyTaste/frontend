import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import {MySelect} from "../../../Common/FormsControls/FormsControls";
import style from "./HobbySelect.module.css";
import {compose} from 'redux';
import {RedLongButton} from "../../../Common/MaterialsButtons";
import {setSubmit} from "../../../../redux/reducers/mainPage-reducer";
import { withRouter } from "react-router-dom";
import {findHobbies} from "../../../../redux/reducers/hobbiesPage-reducer";

let SelectForm = ({handleSubmit, hobbies, metroStations}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <Field name="hobby" component={MySelect} options={hobbies} placeholder={"Введите хобби"}/>
                </div>
                <div>
                    <Field name="metro" component={MySelect} options={metroStations}
                           placeholder={"Введите станцию метро"}/>
                </div>
            </div>
                <div className={style.SearchHobbyButton}>
                    <RedLongButton className={style.button} text={"Подобрать хобби"} label="Submit"
                                   onSubmit={handleSubmit}/>
                </div>
        </form>
    )
};

const SelectingFormValuesForm = reduxForm({
    form: 'mainSelect'
})(SelectForm);

const Seleect = (props) => {
    const onSubmit = (values, dispatch) => {
        if (values.metro) {
            /*console.log(values.metro.value);*/
            console.log(values.metro.label);
            props.history.push('/hobbies/' + values.hobby.label + '/' + values.metro.label);
        } else {
            props.history.push('/hobbies/' + values.hobby.label);
        }
    };

    const metroStations = props.metroStationsToSelect;
    const hobbies = props.hobbiesToSelect;
    return (
        <div>
            <SelectingFormValuesForm onSubmit={onSubmit} hobbies={hobbies} metroStations={metroStations}/>
        </div>
    );

};

const selector = formValueSelector('mainSelect');

const mapStateToProps = (state) => {
    return {
        metroStationsToSelect: state.mainPage.metroStationsToSelect,
        hobbiesToSelect: state.mainPage.hobbiesToSelect,
        isSubmit: state.mainPage.isSubmit
    }
};

export default compose(
    connect(mapStateToProps, {setSubmit, findHobbies}),
    connect(
        state => {
            const hobbyValue = selector(state, 'hobby');
            const metroValue = selector(state, 'metro');
            return {
                metroStationsToSelect: state.mainPage.metroStationsToSelect,
                hobbiesToSelect: state.mainPage.hobbiesToSelect,
                hobbyValue, metroValue
            }
        }
    ), withRouter
)(Seleect);