import React, {Component} from 'react';
import style from './InformationForm.css';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { compose } from 'redux';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { connect } from 'react-redux';
import HalfRating from '../../Common/FeedbackStatistic';


class InformationBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form className={style.form}>
                <div className={style.nameContainer}>
                    <h1 className={style.nameHobby}>{this.props.hobbyInfo.label}</h1>
                    <HalfRating rating={this.props.hobbyInfo.rating}/>
                </div>
                <span className={style.metro}>
                <LocationOnIcon style={{color: '#178fd6'}} /> {this.props.hobbyInfo.metro}
                </span>
                <div className={style.description}>
                <h3>
                    Адрес: {this.props.hobbyInfo.location}
                </h3>
                <h3>
                    Время занятий: {this.props.hobbyInfo.timeTable && this.props.hobbyInfo.timeTable.map(function(time_) {
                    return <p className={style.time}>{time_}</p>;
                })}
                </h3>
                    <h3>
                        Удобства: {this.props.hobbyInfo.facilities}
                    </h3>
                    <h3>
                        Особые условия: {this.props.hobbyInfo.special}
                    </h3>
                </div>
            </form>
        );
    }
}
const mapStateToProps = (state) => ({
/*    initializedHobbyPage: state
*/
});


export default compose(connect(mapStateToProps), withRouter)(InformationBlock);
