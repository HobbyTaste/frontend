import React, {Component} from 'react';
import style from './Categories.module.css';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const Categories = (props) => {
    if(props.providerIsAuth) return <Redirect to={"/provider/cabinet"} />;
        return (<div>
            <div className={style.background}></div>
                    <div className={style.chooseHobby}>Выберите категорию хобби</div>
                    <div className={style.cardsBoard}>
                        <Link to={'search/' + 'sport'} style={{textDecoration: 'none'}}>
                            <div className={`${style.card} ${style.sport}`}>
                                <div className={style.hobbyName}>Спорт</div>
                            </div>
                        </Link>
                        <Link to={'search/' + 'music'} style={{textDecoration: 'none'}}>
                            <div className={`${style.card} ${style.music}`}>
                                <div className={style.hobbyName}>Музыка</div>
                            </div>
                        </Link>
                        <Link to={'search/' + 'travels'} style={{textDecoration: 'none'}}>
                            <div className={`${style.card} ${style.travel}`}>
                                <div className={style.hobbyName}>Путешествия</div>
                            </div>
                        </Link>
                        <Link to={'search/' + 'cookery'} style={{textDecoration: 'none'}}>
                            <div className={`${style.card} ${style.cook}`}>
                                <div className={style.hobbyName}>Кулинария</div>
                            </div>
                        </Link>
                        <Link to={'search/' + 'aquarium'} style={{textDecoration: 'none'}}>
                            <div className={`${style.card} ${style.fish}`}>
                                <div className={style.hobbyName}>Аквариумистика</div>
                            </div>
                        </Link>
                        <Link to={'search/' + 'needlework'} style={{textDecoration: 'none'}}>
                            <div className={`${style.card} ${style.handmade}`}>
                                <div className={style.hobbyName}>Рукоделие</div>
                            </div>
                        </Link>
                        <Link to={'search/' + 'numismatics'} style={{textDecoration: 'none'}}>
                            <div className={`${style.card} ${style.money}`}>
                                <div className={style.hobbyName}>Нумизматика</div>
                            </div>
                        </Link>
                        <Link to={'search/' + 'videogames'} style={{textDecoration: 'none'}}>
                            <div className={`${style.card} ${style.videogames}`}>
                                <div className={style.hobbyName}>Видеоигры</div>
                            </div>
                        </Link>
                        <Link to={'search/' + 'photo'} style={{textDecoration: 'none'}}>
                            <div className={`${style.card} ${style.photo}`}>
                                <div className={style.hobbyName}>Фотография</div>
                            </div>
                        </Link>
                        <Link to={'search/' + 'drawing'} style={{textDecoration: 'none'}}>
                            <div className={`${style.card} ${style.paint}`}>
                                <div className={style.hobbyName}>Рисование</div>
                            </div>
                        </Link>
                        <Link to={'search/' + 'gardening'} style={{textDecoration: 'none'}}>
                            <div className={`${style.card} ${style.garden}`}>
                                <div className={style.hobbyName}>Садоводство</div>
                            </div>
                        </Link>
                        <Link to={'search/' + 'languages'} style={{textDecoration: 'none'}}>
                            <div className={`${style.card} ${style.flag}`}>
                                <div className={style.hobbyName}>Иностранные языки</div>
                            </div>
                        </Link>
                        <Link to={'search/' + 'floristry'} style={{textDecoration: 'none'}}>
                            <div className={`${style.card} ${style.flower}`}>
                                <div className={style.hobbyName}>Флористика</div>
                            </div>
                        </Link>
                        <Link to={'search/' + 'dogbreeding'} style={{textDecoration: 'none'}}>
                            <div className={`${style.card} ${style.dog}`}>
                                <div className={style.hobbyName}>Собаководство</div>
                            </div>
                        </Link>
                        <Link to={'search/' + 'cinema'} style={{textDecoration: 'none'}}>
                            <div className={`${style.card} ${style.cinema}`}>
                                <div className={style.hobbyName}>Кино</div>
                            </div>
                        </Link>
                        <Link to={'search/' + 'autotuning'} style={{textDecoration: 'none'}}>
                            <div className={`${style.card} ${style.auto}`}>
                                <div className={style.hobbyName}>Автотюнинг</div>
                            </div>
                        </Link>
                        <Link to={'search/' + 'other'} style={{textDecoration: 'none'}}>
                            <div className={`${style.card} ${style.other}`}>
                                <div className={style.hobbyName}>Другое</div>
                            </div>
                        </Link>
                    </div>
        </div>);
};

let mapStateToProps = (state) => ({
    providerIsAuth: state.providerCabinet.providerIsAuth
});

export default connect(mapStateToProps, null)(Categories);
