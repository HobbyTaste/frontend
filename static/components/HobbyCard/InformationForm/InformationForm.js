import React, {Component} from 'react';
//import style from './InformationForm.css';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { compose } from 'redux';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { connect } from 'react-redux';


class InformationForm extends React.Component {
    constructor(props) {
        super(props);


        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form>
                <label>
                    Я собираюсь пойти:
                    <input
                        name="hobbyName"
                        type="text"
                        value={"Name"}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    <LocationOnIcon/>
                    <input
                        name="metro"
                        type="text"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange} />
                </label>
            </form>
        );
    }
}


const mapStateToProps = (state) => ({
    //initializedHobbyPage: state.
    providerIsAuth: state.providerCabinet.providerIsAuth,

    isAuthUser: state.auth.isAuth,
    isAuth: state.auth.isAuth || state.providerCabinet.providerIsAuth,
});

export default compose(mapStateToProps, withRouter)(InformationForm);
