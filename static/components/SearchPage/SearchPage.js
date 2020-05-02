import React, { Component , PureComponent} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addHobbyForUser, deleteHobbyForUser } from '../../redux/actions/userActions';
import { addHobbyForProvider, deleteHobbyForProvider } from '../../redux/actions/providerActions';
import Preloader from '../Common/Preloader/Preloader';
import {
    getLabelByUrlCategory,
    initializeSearchPage,
    setCategory,
    setSelector,
    unsetCategory
} from '../../redux/actions/searchActions';
import style from './style.css';
import Content from './Content/Content';
import Selector from './Selector';
import ButtonsSend from '../HobbyCard/Button/ButtonsSend';
import ClearIcon from '@material-ui/icons/Clear';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';

class SearchPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            countShow: 10,
            lengthHobbies: this.props.hobbiesReceived.length,
        };
        this.handleAddMyHobby = this.handleAddMyHobby.bind(this);
        this.handleDeleteMyHobby = this.handleDeleteMyHobby.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancelCategory = this.handleCancelCategory.bind(this);
    }

    componentDidMount() {
        this.props.initialize(this.props.word, this.props.match.params.category);
    }

    handleAddMyHobby(event) {
        console.log('addHobby');
        if (this.props.isUserAuth) {
            this.props.onAddUserHobby(this.props.hobbyInfo.id, this.props.id);
        } else {
            this.props.onAddProviderHobby(this.props.hobbyInfo.id, this.props.id);
        }
    }

    handleCancelCategory(event){
        this.props.history.push('/search');
        this.props.unsetCategory(this.props.hobbiesReceived);
    }

    handleClick(event) {
        const new_value = this.state.countShow + 10;
        this.setState({countShow: new_value});
    }

    handleDeleteMyHobby(event) {
        console.log('delete hobby');
        if (this.props.isUserAuth) {
            this.props.onDeleteUserHobby(this.props.hobbyInfo.id, this.props.id);
        } else {
            this.props.onDeleteProviderHobby(this.props.hobbyInfo.id, this.props.id);
        }
    }

    handleChange(event) {
        //selector data distance rating
        this.props.setSelector(this.props.hobbiesShow, event.target.value);
    }

    render() {
        if (!this.props.initializedPage) {
            return <Preloader/>;
        }

        let isAllCategory = false;
        const currentCategory = getLabelByUrlCategory(this.props.category);
        if (currentCategory === 'Все категории') {
            isAllCategory = true;
        }
        let realShow = this.state.countShow;
        if ( this.props.hobbiesShow.length < realShow){
           realShow = this.props.hobbiesShow.length;
        }
        return (
            <div className={style.container}>
                <div className={style.headerContainer}><p className={style.header}>Результаты поиска по запросу:
                    "{this.props.word}"</p>
                </div>
                <div className={style.settingsContainer}>
                    <div className={style.categoryContainer}>
                        <p className={style.categoryText}>Категории: &nbsp;</p>
                        <div className={style.category}>
                            <p className={style.categoryName}>{currentCategory}</p>
                            {(!isAllCategory) && <button className={style.iconClear} onClick={this.handleCancelCategory}><ClearIcon fontSize={'small'}/></button>}
                        </div>
                    </div>
                        <Selector handleChange={this.handleChange}/>
                </div>
                    <div>
                        <Content hobbies={this.props.hobbiesShow.slice(0, realShow)} isUserAurh={this.props.isUserAuth} isProviderAuth={this.props.isProviderAuth}/></div>
                {(realShow < this.props.hobbiesShow.length) &&
                    <div className={style.buttonMoreContainer}>
                        <ButtonsSend onClick={this.handleClick} type="button" text="Показать больше..."/>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    word: state.searchPage.word,
    category: state.searchPage.category,
    hobbiesShow: state.searchPage.hobbiesShow,
    initializedPage: state.searchPage.initializedSearchPage,
    hobbiesReceived: state.searchPage.hobbiesToSearch,
    id: state.auth.userId || state.providerCabinet.providerId,
    isUserAuth: state.auth.isAuth,
    isProviderAuth: state.providerCabinet.providerIsAuth,
    hobbiesFollowed: [...state.auth.userHobbies, ...state.providerCabinet.followedHobbies],
    hobbiesOwnedProvider: state.providerCabinet.providerHobbies,
});
const mapDispatchToProps = (dispatch) => ({
    onAddUserHobby: (idHobby, idUser) => dispatch(addHobbyForUser(idHobby, idUser)),
    onDeleteUserHobby: (idHobby, idUser) => dispatch(deleteHobbyForUser(idHobby, idUser)),
    onAddProviderHobby: (idHobby, idProvider) => dispatch(addHobbyForProvider(idHobby, idProvider)),
    onDeleteProviderHobby: (idHobby, idProvider) => dispatch(deleteHobbyForProvider(idHobby, idProvider)),
    initialize: (word, category) => dispatch(initializeSearchPage(word, category)),
    unsetCategory: (hobbies) => dispatch(unsetCategory(hobbies)),
    setSelector: (hobbies, selector) => dispatch(setSelector(hobbies, selector)),
});


export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(SearchPage);
