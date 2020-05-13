import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import EditIcon from '@material-ui/icons/Edit';
import Monetization from './Price/Monetization';
import Tag from './Tags/Tag';
import Price from './Price/Price';
import HalfRating from '../../Common/FeedbackStatistic';
import style from './Slot.module.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { changeHobbyForProvider, changeHobbyForUser, initializeHobbyPage } from '../../../redux/actions/hobbyActions';
import { isInArray } from '../../../utils/functions';
/* времено, чтобы передалвался массив комментариев */
const comments = [{
    idComment: 1,
    userId: 1,
    text: 'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
    nameWriter: 'Азалия',
    date: '28.12.2020',
    stars: 2,
    answer: {
        providerId: 1,
        text: 'Спасибо за ваш отзыв! ',
        nameWriter: 'Имя парнера',
        date: '15.04.2020',
    },
},
    {
        idComment: 2,
        userId: 2,
        text: 'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
        nameWriter: 'Имя',
        date: '28.12.2020',
        stars: 3,
        answer: null,
    },
    {
        idComment: 3,
        userId: 2,
        text: 'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
        nameWriter: 'Имя',
        date: '28.12.2020',
        stars: 5,
        answer: {
            providerId: 2,
            text: 'Спасибо за ваш отзыв! бла бла бла',
            nameWriter: 'Имя парнера2',
            date: '16.04.2020',
        },
    }];

const imageMissing = 'https://kravmaganewcastle.com.au/wp-content/uploads/2017/04/default-image-800x600.jpg';


class Slot extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeMyHobby = this.handleChangeMyHobby.bind(this);
    }

    handleChangeMyHobby(event, hobbyId) {
        if (this.props.isUserAuth) {
            this.props.onChangeUserHobby(hobbyId);
        } else {
            this.props.onChangeProviderHobby(hobbyId);
        }
    }

    render() {
        return (<div className={style.slot}>
            {this.props.pic ? <img className={style.slotPic} src={this.props.pic}/> :
                <img className={style.slotPic} src={imageMissing}/>}
            <span className={style.slotDescription}>
            <div className={style.slotHeader}>
                <Link to={`/hobby/card/${this.props.id}`}
                      className={`${style.name} ${style.colorBlackSlot}`}>{this.props.name}</Link>
                <HalfRating answersArray={comments}/>
            </div>
            <div className={`${style.metro} ${style.colorBlueSlot}`}>
                <LocationOnIcon style={{
                    color: '#034488',
                    fontSize: 'small'
                }}/> {this.props.metro}
            </div>
            <div className={`${style.address} ${style.colorGraySlot}`}>{this.props.adress}</div>
        </span>
            {this.props.isOwn
                ? <Monetization Widget={this.props.Widget} Top={this.props.Top} Poster={this.props.Poster}/>
                : <span className={style.addInfoContainer}>
                <Tag isParking={this.props.isParking} isBeginner={this.props.isBeginner} isRent={this.props.isRent}
                     isChild={this.props.isChild}/>
                <Price price={this.props.price} priceTime={this.props.priceTime} priceCurriculum={this.props.priceCurriculum}/>
            </span>}

            { (this.props.isProviderAuth || this.props.isUserAuth) ? (this.props.isOwner ? (this.props.isOwn ?
                <div className={style.icon}>
                    <Link to='/provider/cabinet/edit_hobby'><EditIcon style={{ color: 'black' }}/></Link>
                </div>
                : <Link to="/provider/cabinet" style={{
                    color: 'black',
                    display: 'flex',
                    top: '50%'
                }}>
                    <div className={style.icon}><MonetizationOnIcon/></div>
                </Link>)
                : (isInArray(this.props.idUser, this.props.subscribers) ? <button className={style.buttonContainer}>
                        <div className={style.icon}><BookmarkIcon/></div>
                    </button> :
                    <button className={style.buttonContainer}>
                        <div className={style.icon}><BookmarkBorderIcon/></div>
                    </button>)
            ): <div className={style.iconEmpty}/>}
            <Link to={`/hobby/card/${this.props.id}`} className={style.icon}><MoreHorizIcon/></Link>
        </div>);
    }
}


const mapStateToProps = (state) => ({
    idUser: state.userCabinet.id || state.providerCabinet.providerId,
    //  isUserAuth: state.userCabinet.isAuth,
    // isProviderAuth: state.providerCabinet.providerIsAuth,
});
const mapDispatchToProps = (dispatch) => ({
    onChangeUserHobby: (idHobby) => dispatch(changeHobbyForUser(idHobby)),
    onChangeProviderHobby: (idHobby) => dispatch(changeHobbyForProvider(idHobby)),
});


export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(Slot);
