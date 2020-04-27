import  React, {Component} from 'react'
import style from './Feedback.css';
import { connect } from 'react-redux';
import CommentText from './CommentText';
import CommentInput from './CommentInput';



const comments=[{
    idComment: 1,
    userId: 1,
    isHaveAnswer: true,
    text: 'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
    nameWriter: 'Азалия',
    date: '28.12.2020',
    stars: 5,
    answerId:1,
},
    {
        idComment: 2,
        userId: 2,
        isHaveAnswer: false,
        text:'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
        nameWriter: 'Имя',
        date: '28.12.2020',
        stars: 5,
        answerId: null,
    },

    {
        idComment: 3,
        userId: 3,
        isHaveAnswer: true,
        text:'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
        nameWriter: 'Имя еще',
        date: '30.3.2020',
        stars: 4,
        answerId: 2,
    },
]
const answers=[{
    answer_id: 1,
    providerId: 1,
    text: 'Спасибо за ваш отзыв! бла бла бла',
    nameWriter: 'Имя парнера',
    status: 'директор',
    idComment: 1,
    date: '15.04.2020',
},
    {
        answerId:2,
        providerId: 2,
        text: 'Спасибо за ваш отзыв! бла бла бла',
        nameWriter: 'Имя парнера2',
        status: 'руководитель',
        idComment: 3,
        date: '16.04.2020',
    }
]

class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserAuth: props.isUserAuth,
            isProviderAuth: props.isProviderAuth,
        };
    }


    render(){
        const isProvider = this.state.isProviderAuth;
        function getAnswer(answerId){
            return answers[answerId-1];
        }
        return (
            <div>
            <ul className={style.list}>
                {
                    comments.map(function(item) {
                        return <li key={item.idComment} className={style.container}>
                            <CommentText comment={item} isProviderAuth={isProvider} isItAnswerProvider={false}  />
                            {item.isHaveAnswer && <CommentText comment={getAnswer(item.answerId)} isProviderAuth={isProvider} isItAnswerProvider={true}/>}
                        </li>
                    })
                }
            </ul>
                {this.state.isUserAuth && <div><p className={style.labelAnswer} > Добавить отзыв:</p> <CommentInput isAnswer={false} /> </div>}
        </div>
        );
    }
}

export default Feedback;
