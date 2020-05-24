import React from 'react';
import style from '../HobbyCard/Feedback/Feedback.css';
import CommentText from '../HobbyCard/Feedback/CommentText';

const CommentsList = (props) => {
    return (<ul className={style.list}>
            {
                props.comments.map(function (item, index) {
                    let isHaveAnswer = true;
                    if ((item.answer) == null){
                        isHaveAnswer = false;
                    }
                    return <li key={index} className={style.container}>
                        <CommentText comment={item} isProviderAuth={true} isHaveAnswer= {item.answer != null}
                                     isOwner = {true} isItAnswerProvider={false} hobbyId={props.hobbyIds[index]}/>
                        {item.answer &&
                        <CommentText comment={item.answer} isProviderAuth={props.isProvider} isItAnswerProvider={true}/>}
                    </li>;
                })
            }
        </ul>
    );
};

export default CommentsList;
