import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import style from './Slot.module.css';
import HalfRating from '../../HobbyCard/InformationForm/FeedbackStatistic';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Price from './Price/Price';
import Tag from './Tags/Tag';

class Slot extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    render() {
        return (<div className={style.slot}>
            <span className={style.slotPic}/>
            <span className={style.slotDescription}>
                <div className={style.slotHeader}>
                    <span className={`${style.name} ${style.colorBlackSlot}`}>{this.props.name}</span>
                    <HalfRating isUserAuth = {this.props.isUserAuth}/>
                </div>
                <div className={`${style.metro} ${style.colorBlueSlot}`}>
                    <LocationOnIcon style={{ color: '#034488' }} /> {this.props.metro}
                </div>
                <div className={`${style.address} ${style.colorGraySlot}`}>{this.props.adress}</div>
            </span>
            <Price price={this.props.price} priceTime={this.props.priceTime} priceCurriculum={this.props.priceCurriculum}/>
            <Tag isParking={this.props.isParking} isBeginner={this.props.isBeginner} isRent={this.props.isRent}/>

        </div>);
    }
}

export default Slot;
