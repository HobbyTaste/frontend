import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import photo from './photo.png';
import style from './Image.css';
import 'swiper/css/swiper.css';
//import Image from 'material-ui-image';

import Swiper from 'react-id-swiper';
import CommentText from '../Feedback/CommentText';

const images = ['https://czech-rurepublic-gb.ru/wp-content/uploads/2015/12/143635088818.jpg', 'https://w-dog.ru/wallpapers/0/0/437992000662990/kamera-fotoapparat-contax-devushka-fotograf.jpg', photo]



const useStyles = makeStyles((theme) => ({
    bar:{
        height: '30px',
    }
}));

const tile = {
    title: 'Title',
    author: 'Author',
    img: photo,
}


const SimpleSwiperWithParams = () => {
    const params = {
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        navigation: {
          //  nextEl: '.swiper-button-next',
            //prevEl: '.swiper-button-prev'
        },
        loop: true,
        spaceBetween: 30
    }
    const classes = useStyles();

    return(
        <Swiper {...params}>
            {
                images.map(function(im, index) {
                    return <div key={index}><img className={style.image} src={im}/>
                        <GridListTileBar className={classes.bar}
                        />
                    </div>
                })
            }
        </Swiper>

    )
}

export default SimpleSwiperWithParams;
