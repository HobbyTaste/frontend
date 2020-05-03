import React, { Component } from "react";
import style from "./UserComments.css";
import { connect } from "react-redux";
import CommentText from "../HobbyCard/Feedback/CommentText";

function changeNaming(comment) {
    return {
        nameWriter: comment.name,
        date: comment.datetime,
        stars: comment.evaluation,
        text: comment.text
    };
}

const UserComments = ({comments}) => {
    return (
        <div>
            <ul className={style.list}>
                {comments.map(function(item) {
                    return (
                        <li key={item.userId + item.datetime} className={style.container}>
                            <CommentText
                                comment={changeNaming(item)}
                                isProviderAuth={false}
                                isHaveAnswer={Boolean(item.answer)}
                                isItAnswerProvider={false}
                            />
                            {item.answer && (
                                <CommentText
                                    comment={changeNaming(item.answer)}
                                    isProviderAuth={false}
                                    isItAnswerProvider={true}
                                />
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => ({
    comments: state.userCabinet.userComments || [],
});

export default connect(mapStateToProps)(UserComments);
