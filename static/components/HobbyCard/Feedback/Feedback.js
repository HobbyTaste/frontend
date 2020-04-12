import React, { Component } from 'react';
import style from './Feedback.css';
import { connect } from 'react-redux';
import CommentText from './CommentText';
import CommentInput from './CommentInput';

class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserAuth: props.isUserAuth,
            isProviderAuth: props.isProviderAuth,
            comments: props.comments,
            answers: props.answers,
        };
    }

    render() {
        const isProvider = this.state.isProviderAuth;
        const answersList = this.state.answers;
        function getAnswer(answerId) {
            return answersList[answerId - 1];
        }

        return (
            <div>
                <ul className={style.list}>
                    {
                        this.state.comments.map(function (item) {
                            return <li key={item.idComment} className={style.container}>
                                <CommentText comment={item} isProviderAuth={isProvider} isItAnswerProvider={false}/>
                                {item.isHaveAnswer &&
                                <CommentText comment={getAnswer(item.answerId)} isProviderAuth={isProvider}
                                             isItAnswerProvider={true}/>}
                            </li>;
                        })
                    }
                </ul>
                {this.state.isUserAuth &&
                <div><p className={style.labelAnswer}> Добавить отзыв:</p> <CommentInput isAnswer={false}/></div>}
            </div>
        );
    }
}


let mapStateToProps = (state) => ({
    answers: state.hobbyPage.answers,
    comments: state.hobbyPage.comments,

});

export default connect(mapStateToProps, null)(Feedback);

