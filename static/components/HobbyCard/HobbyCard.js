import React, { Component } from 'react';
import style from './HobbyCard.css';
import feedStyle from './Feedback/Feedback.css';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Feedback from './Feedback/Feedback';
import Sidebar from './Sidebar/Sidebar';
import ButtonInMyHobby from './Button/ButtonUser';
import ButtonProvider from './Button/ButtonProvider';
import Slider from './Image/Slider';

import InformationBlock from './InformationForm/InformationForm';


const isInArray = (idHobby, array) => {
    if (array.includes(idHobby)) {
        return true;
    } else {
        return false;
    }
};
const ButtonAction = (props) => {
    console.log(props);
    const arrayHobbies = [...props.hobbiesFollowedProvider, ...props.hobbiesUser];
    if (props.isProviderAuth && isInArray(props.hobbyInfoId, props.hobbiesOwnedProvider)) {
        return <NavLink to={'/provider/cabinet'}><ButtonProvider text="Редактировать"/> </NavLink>;
    } else if (props.isProviderAuth || props.isUserAuth) {
        if (isInArray(props.hobbyInfoId, arrayHobbies)) {
            return <ButtonInMyHobby onClick={this.handleAddMyHobby} status={true}/>;
        } else {
            return <ButtonInMyHobby onClick={this.handleAddMyHobby} status={false}/>;
        }
    }
    return <div></div>;
};


class HobbyCard extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddMyHobby = this.handleAddMyHobby.bind(this);
    }
    handleAddMyHobby(event) {
        console.log('addHobby');
        this.props.onAddUserHobby(this.props.idHobby, this.props.idUser);
    }

    render() {
        return (
            <div>
                <div className={style.infoContainer}>
                    <div className={style.mainContainer}>
                        <div className={style.mainBlock}>
                            <div className={style.imageContainer}><Slider/></div>
                            <div className={style.textContainer}>
                                <InformationBlock name={this.props.hobbyInfo.label}
                                                  metro={this.props.hobbyInfo.metro}
                                                  time={this.props.hobbyInfo.timeTable}
                                                  equipment={this.props.hobbyInfo.equipment}
                                                  adress={this.props.hobbyInfo.address}
                                                  specialConditions={this.props.hobbyInfo.specialConditions}
                                                  comfortable={this.props.hobbyInfo.comfortable}/>

                                <div className={style.buttonContainer}>
                                    <ButtonAction isProviderAuth={this.props.isProviderAuth} isUserAuth={this.props.isUserAuth}
                                                  hobbyInfoId={this.props.hobbyInfo.id}
                                                  hobbiesFollowedProvider={this.props.hobbiesFollowedProvider}
                                                  hobbiesUser={this.props.hobbiesUser}
                                                  hobbiesOwnedProvider={this.props.hobbiesOwnedProvider}/>
                                </div>
                            </div>
                        </div>

                        <h4 className={style.mainDescription}>
                            {this.props.hobbyInfo.description}
                        </h4>
                    </div>
                    <div className={style.panel}>
                        <Sidebar price={this.props.hobbyInfo.price} mobile={this.props.hobbyInfo.contact.mobile}
                                 website={this.props.hobbyInfo.contact.website} flag={this.props.hobbyInfo.flag}/>
                    </div>
                </div>
                <div className={style.communication}>
                    <p className={feedStyle.labelAnswer}> Отзывы:</p>
                    <Feedback isUserAuth={this.props.isUserAuth} isProviderAuth={this.props.isProviderAuth}/>

                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    isUserAuth: state.auth.isAuth,
    isProviderAuth: state.providerCabinet.providerIsAuth,
    hobbiesUser: state.auth.userHobbies,
    hobbiesFollowedProvider: state.providerCabinet.followedHobbies,
    hobbiesOwnedProvider: state.providerCabinet.providerHobbies,

    isPageInitialized: state.hobbyPage.initialized,
    hobbyInfo: {
        //id: state.hobbyPage.id,
        id: 1,
        label: state.hobbyPage.label,
        metro: state.hobbyPage.metro,
        timeTable: state.hobbyPage.timeTable,
        equipment: state.hobbyPage.equipment,
        address: state.hobbyPage.address,
        comfortable: state.hobbyPage.comfortable,
        specialConditions: state.hobbyPage.specialConditions,
        description: state.hobbyPage.description,
        price: state.hobbyPage.price,
        flag: state.hobbyPage.flag,
        contact: state.hobbyPage.contact,
        category: state.hobbyPage.category,
    },
});

export default connect(mapStateToProps, dispatch => ({
    onAddUserHobby: (idHobby, idUser) => {
        dispatch({
            type: 'ADD_HOBBY_USER',
            idHobby: idHobby,
            idUser: idUser
        });
    }
}))(HobbyCard);
