import  React, {Component} from 'react'
import style from './Feedback.css';
import Rating from '@material-ui/lab/Rating';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ButtonProvider from '../Button/ButtonProvider';
import { connect } from 'react-redux';
const anwerInBD=[{
    userId: 1,
    userName: 'Азалия',
    data: '28.12.2020',
    text:'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
    star: 5,
    answerId:1,
},
    {
        userId: 2,
        userName: 'Имя',
        data: '21.10.2020',
        text:'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
        star: 3,
        answerId:2,
    },
]



const useStyles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        color: 'rgba(0, 0, 0, 0.54)',
    },
    stars:{
        color: 'rgba(0, 0, 0, 0.54)'
    },
    countStars:{
        margin: '0px 5px',
    }
});


class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserAuth: false,
            isProviderAuth: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClick(event) {
        //dds
    }

    handleClose () {
    //    this.setState({isShow: false});

    }
    render(){
        const classes = useStyles()
        const isProvider = this.state.isProviderAuth;
        return (
            <ul className={style.list}>
                {
                    anwerInBD.map(function(item) {
                        return <li key={item.answerId} className={style.container}>
                            <div className={style.info}>
                                <div className={style.containerInfo}>
                                <p className={style.icon}><AccountCircleIcon style={{ fontSize: 40}} /></p>
                                <div className={style.infoData}>
                                    <p className={style.userName}>{item.userName}</p>
                                    <p className={style.data}> {item.data}</p>
                                </div>
                                </div>
                                {isProvider && <ButtonProvider className={style.buttonContainer} text="Ответить"/>}
                            </div>
                            <Rating style={classes.stars} size='small' name="half-rating-read" defaultValue={item.star} precision={0.5} readOnly />
                            <div className={style.text}>
                                {item.text}
                            </div>
                        </li>
                    })
                }
            </ul>

        );
    }
}


export default Feedback;
