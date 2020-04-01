import React, {Component} from 'react';
import style from './InformationForm.css';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { compose } from 'redux';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { connect } from 'react-redux';
import HalfRating from './FeedbackStatistic';
import { initializeMainPage } from '../../../redux/reducers/mainPage-reducer';
import { makeStyles, withStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        color: 'rgba(0, 0, 0, 0.54)',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    },
    stars:{
        color: 'rgba(0, 0, 0, 0.54)',
    }
}));



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
                <div className={style.nameContainer}>
                    <h1 className={style.nameHobby}>{this.props.name}</h1>
                    <HalfRating isUserAuth = {this.props.isUserAuth}/>
                </div>
                <span className={style.metro}>
                <LocationOnIcon /> {this.props.metro}
                </span>
                <div className={style.description}>
                <h3>
                    Адрес: {this.props.adress}
                </h3>
                <h3>
                    Время занятий: {this.props.time}
                </h3>
                    <h3>
                        Удобства: {this.props.comfortable}
                    </h3>
                    {this.props.equipment && <h3> Экипировка: {this.props.equipment} </h3>}
                    <h3>
                        Особые условия: {this.props.specialConditions}
                    </h3>
                </div>
            </form>
        );
    }
}
//export default InformationForm;


const mapStateToProps = (state) => ({
/*    initializedHobbyPage: state.
    providerIsAuth: state.providerCabinet.providerIsAuth,

    isAuthUser: state.auth.isAuth,
    isAuth: state.auth.isAuth || state.providerCabinet.providerIsAuth,
*/

    isProviderAuth: false,
    isUserAuth: false,
    isAuth: false,
});


export default compose(connect(mapStateToProps), withRouter)(InformationForm);
