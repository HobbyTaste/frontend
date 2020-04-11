import Swiper from 'react-id-swiper';
import style from '../HobbyCard/Image/Image.css';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import React from 'react';
import Card from './Card/Card';

const images = ['https://czech-rurepublic-gb.ru/wp-content/uploads/2015/12/143635088818.jpg',
    'https://w-dog.ru/wallpapers/0/0/437992000662990/kamera-fotoapparat-contax-devushka-fotograf.jpg',
    'https://images.wallpaperscraft.com/image/strings_balls_coils_needles_sewing_hobby_49168_1680x1050.jpg',
    'https://images.wallpaperscraft.com/image/watercolor_paints_palette_156356_1600x1200.jpg',
    'https://images.wallpaperscraft.com/image/craft_souvenir_handmade_hobby_49158_1600x900.jpg',
    'https://images.wallpaperscraft.com/image/skateboard_skateboarder_hobby_116485_1600x1200.jpg']

const CardSlider = () => {
    const params = {
        slidesPerView: 3,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        loop: true,
        spaceBetween: 5,
    }

    return (
        <Swiper {...params}>
            {
                images.map(function(im, index) {
                    return <div>
                        <Card name='Вид хобби' metro='Китай-город' address='улица Строителей, дом 15' pic={images[index]}/>
                        <Card name='Вид хобби' metro='Китай-город' address='улица Строителей, дом 15' pic={images[(index+1)%images.length]}/>
                        <Card name='Вид хобби' metro='Китай-город' address='улица Строителей, дом 15' pic={images[(index+2)%images.length]}/>
                    </div>
                })
            }
        </Swiper>
    )
}

export default CardSlider;

/*const SimpleSwiperWithParams = () => {
    const params = {
        slidesPerView: 3,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        loop: true,
        spaceBetween: 5
    }

    return (
        <Swiper {...params}>
            {
                images.map(function(im, index) {
                    return <div>
                        <Card name='Вид хобби' metro='Китай-город' address='улица Строителей, дом 15' pic={images[index]}/>
                        <Card name='Вид хобби' metro='Китай-город' address='улица Строителей, дом 15' pic={images[(index+1)%images.length]}/>
                        <Card name='Вид хобби' metro='Китай-город' address='улица Строителей, дом 15' pic={images[(index+2)%images.length]}/>
                    </div>
                })
            }
        </Swiper>
    )
}*/
