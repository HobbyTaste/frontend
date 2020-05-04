import React from 'react';
import style from './Feedback.css';
import CommentText from './CommentText';

const CommentsList = (props) => {
    return (<ul className={style.list}>
            {
                props.comments.map(function (item) {
                    let isHaveAnswer = true;
                    if ((item.answer) == null){
                        isHaveAnswer = false;
                    }
                    return <li key={item.idComment} className={style.container}>
                        <CommentText comment={item} isProviderAuth={props.isProvider} isHaveAnswer= {isHaveAnswer}
                                     isOwner = {props.isOwner} isItAnswerProvider={false}/>
                        {item.answer &&
                        <CommentText comment={item.answer} isProviderAuth={props.isProvider} isItAnswerProvider={true}/>}
                    </li>;
                })
            }
        </ul>
    );
};

export default CommentsList;
