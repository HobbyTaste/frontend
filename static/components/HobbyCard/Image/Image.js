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

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        width:'100%',
        height:'100%',
    },
    gridList: {
        width: 370,
        height: 325,
    },
    image: {
        width: '100% !important',
        height: '100% !important',
    },
    bar:{
        height:'40%'
    }
}));

const tile = {
    title: 'Title',
    author: 'Author',
    img: photo,
}


export default function ImageSlider() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
                    <GridListTile key={tile.img} className={classes.image}>
                        <img src={tile.img} alt={tile.title} className={style.image} />
                        <GridListTileBar className={classes.bar}
                            title={tile.title}
                            subtitle={<span>by: {tile.author}</span>}
                        />
                    </GridListTile>
            </GridList>
        </div>
    );
}
