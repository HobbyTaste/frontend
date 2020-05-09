import React, { Component, PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addHobbyForUser, deleteHobbyForUser } from '../../redux/actions/userActions';
import { addHobbyForProvider, deleteHobbyForProvider } from '../../redux/actions/providerActions';
import Preloader from '../Common/Preloader/Preloader';
import {
    getLabelByUrlCategory,
    initializeSearchPage,
    unsetCategory
} from '../../redux/actions/searchActions';
import style from './style.css';
import Content from './Content/Content';
import Selector from './Selector';
import ButtonsSend from '../HobbyCard/Button/ButtonsSend';
import ClearIcon from '@material-ui/icons/Clear';
import { compose } from 'redux';


class SearchPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            countShow: 10,
            selector: 'data',
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

    handleAddMyHobby(event, hobbyId) {
        console.log('addHobby');
        if (this.props.isUserAuth) {
            this.props.onAddUserHobby(hobbyId);
        } else {
            this.props.onAddProviderHobby(hobbyId);
        }
    }

    handleCancelCategory(event) {
        this.props.history.push('/search');
        this.props.unsetCategory(this.props.hobbiesReceived);
    }

    handleClick(event) {
        const new_value = this.state.countShow + 10;
        this.setState({ countShow: new_value });
    }

    handleDeleteMyHobby(event, hobbyId) {
        console.log('delete hobby');
        if (this.props.isUserAuth) {
            this.props.onDeleteUserHobby(hobbyId);
        } else {
            this.props.onDeleteProviderHobby(hobbyId);
        }
    }

    handleChange(event) {
        this.setState({ selector: event.target.value });
        //selector data distance rating
    }

    render() {
        if (!this.props.initializedPage) {
            return <Preloader/>;
        }

        const categoriesConcrete = ['creativity', 'art', 'dance', 'sport', 'music', 'sport_wrestling', 'sport_water', 'sport_winter', 'sport_game'];
        let isAllCategory = false;
        const currentCategory = getLabelByUrlCategory(this.props.category);
        if (currentCategory === 'Все категории') {
            isAllCategory = true;
        }
        let realShow = this.state.countShow;
        if (this.props.hobbiesReceived.length < realShow) {
            realShow = this.props.hobbiesReceived.length;
        }
        let filteredHobbyies = this.props.hobbiesReceived.filter(n => (
            (this.props.category === 'Все категории' || n.category === this.props.category ||
                (this.props.category === 'other' && !(categoriesConcrete.includes(`${n.category}`)))) &&
            (!this.props.filtersArray.length || (n.parking && this.props.filtersArray.includes('parking')) ||
                (n.children && this.props.filtersArray.includes('child')) ||
                (n.novice && this.props.filtersArray.includes('beginner')) ||
                (n.equipment && this.props.filtersArray.includes('equipment')))
        ));
        return (
            <div className={style.container}>
                <div className={style.headerContainer}>{this.props.word !== '' ? <p className={style.header}>Результаты поиска по запросу:
                    "{this.props.word}"</p> : <p className={style.header}>Результаты:</p> }
                </div>
                <div className={style.settingsContainer}>
                    <div className={style.categoryContainer}>
                        <p className={style.categoryText}>Категории: &nbsp;</p>
                        <div className={style.category}>
                            <p className={style.categoryName}>{currentCategory}</p>
                            {(!isAllCategory) &&
                            <button className={style.iconClear} onClick={this.handleCancelCategory}><ClearIcon
                                fontSize={'small'}/></button>}
                        </div>
                    </div>
                    <Selector handleChange={this.handleChange}/>
                </div>
                <div>
                    <Content hobbies={filteredHobbyies.slice(0, realShow)} isUserAuth={this.props.isUserAuth}
                             isProviderAuth={this.props.isProviderAuth} idUser={this.props.id}/></div>
                {(realShow < filteredHobbyies.length) &&
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
    filtersArray: state.searchPage.filter,
    initializedPage: state.searchPage.initializedSearchPage,
    hobbiesReceived: state.searchPage.hobbiesToSearch,
    id: state.userCabinet.userId || state.providerCabinet.providerId,
    isUserAuth: state.userCabinet.isAuth,
    isProviderAuth: state.providerCabinet.providerIsAuth,
});
const mapDispatchToProps = (dispatch) => ({
    onAddUserHobby: (idHobby, idUser) => dispatch(addHobbyForUser(idHobby, idUser)),
    onDeleteUserHobby: (idHobby, idUser) => dispatch(deleteHobbyForUser(idHobby, idUser)),
    onAddProviderHobby: (idHobby, idProvider) => dispatch(addHobbyForProvider(idHobby, idProvider)),
    onDeleteProviderHobby: (idHobby, idProvider) => dispatch(deleteHobbyForProvider(idHobby, idProvider)),
    initialize: (word, category) => dispatch(initializeSearchPage(word, category)),
    unsetCategory: (hobbies) => dispatch(unsetCategory(hobbies)),
});


export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(SearchPage);
