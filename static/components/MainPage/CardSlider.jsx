import Swiper from 'react-id-swiper';
import React from 'react';
import Card from './Card/Card';

const CardSlider = (props) => {
    const params = {

        loop: true,
        spaceBetween: 5,
        slidesPerView: 3,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    };
    return (
        <Swiper {...params}>
            {
                props.hobbies.map(function(im, index) {
                    return <div key={index}>
                        <Card name={im.label} metro={im.metroStation} isOwner={im.owner === props.idPerson}
                              rating={im.rating} address={im.address} pic={im.avatar} id={im._id} subscribers={im.subscribers.concat(im.providerSubscribers)}
                              isUserAuth={props.isUserAuth} isProviderAuth={props.isProviderAuth} onClick={props.onClick} idUser = {props.idPerson}/>
                    </div>
                })
            }
        </Swiper>
    );
};

export default CardSlider;
/* */
