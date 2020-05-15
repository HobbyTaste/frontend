import { NavLink } from 'react-router-dom';
import ButtonProvider from './Button/ButtonProvider';
import ButtonAddMyHobby from './Button/ButtonAddHobby';
import ButtonDeleteMyHobby from './Button/ButtonDeleteHobby';
import React from 'react';
import { isInArray } from '../../utils/functions';


const ButtonAction = (props) => {
    if (props.isProviderAuth && props.isOwner) {
        return <NavLink to={'/provider/cabinet'}><ButtonProvider text="Редактировать"/> </NavLink>;
    } else if (props.isProviderAuth || props.isUserAuth) {
        if (isInArray(props.id, props.subscribers)) {
            return <ButtonDeleteMyHobby onClick={props.handleChangeMyHobby}/>;
        } else {
            return <ButtonAddMyHobby onClick={props.handleChangeMyHobby} />;
        }
    }
    return <div></div>;
};
export default ButtonAction;
