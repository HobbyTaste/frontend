import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import photo from './photo.png';
import style from './Image.css';
import 'swiper/css/swiper.css';
import Swiper from 'react-id-swiper';



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



const SimpleSwiperWithParams = (props) => {
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

    const imageMissing=['https://kravmaganewcastle.com.au/wp-content/uploads/2017/04/default-image-800x600.jpg'];
    let images = props.images;
    if (props.images === undefined || props.images === null || props.images[0] === null || props.images[0] === ""){
        images = imageMissing;
    }

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
