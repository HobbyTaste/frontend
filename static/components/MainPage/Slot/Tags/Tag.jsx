import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import style from './Tag.module.css';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

const tags = ['рядом парковка', 'для новичков', 'экипировка'];

const Tag = (props) => (<span className={style.tagContainer}>
    { (props.isParking || props.isBeginner || props.isRent) && <div className={`${style.tag} ${style.tagFirst}`}>
        {(props.isParking && tags[0]) || (!props.isParking && props.isBeginner && tags[1]) || (!props.isParking && !props.isBeginner && props.isRent && tags[2])}
        <span className={style.icon}><DoneOutlineIcon style={{ fontSize: 'small' }}/></span>
    </div>}
    { ((props.isParking && props.isRent) || (props.isParking && props.isBeginner) || (props.isBeginner && props.isRent))
        && <div className={`${style.tag} ${style.tagSecond}`}>
        {(props.isParking && props.isBeginner && tags[1]) || (props.isParking && !props.isBeginner && props.isRent && tags[2]) || (!props.isParking && props.isBeginner && props.isRent && tags[2])}
        <span className={style.icon}><DoneOutlineIcon style={{ fontSize: 'small' }}/></span>
    </div>}
    { (props.isParking && props.isBeginner && props.isRent) && <div className={`${style.tag} ${style.tagThird}`}>
        {tags[2]}
        <span className={style.icon}><DoneOutlineIcon style={{ fontSize: 'small' }}/></span>
    </div>}
</span>);

export default Tag;
