import React, { Component } from 'react';
import style from './Feedback.css';
import { connect } from 'react-redux';
import CommentText from './CommentText';
import CommentInput from './CommentInput';
import { addProviderResponse, addUserFeedback } from '../../../redux/actions/hobbyActions';
import CommentsList from './CommentsList';

class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (values) => {
        console.log(values);
        this.props.onUserFeedback(this.props.hobbyId, this.props.id, values);
    };

    render() {
        const isProvider = this.props.isProviderAuth;
        const isOwner = this.props.isOwner;
        const onSubmit = this.handleSubmit
        return (
            <div>
                <CommentsList isProvider={isProvider} isOwner = {isOwner} comments ={this.props.comments}/>
                {this.props.isUserAuth &&
                <div><p className={style.labelAnswer}> Добавить отзыв:</p>
                    <CommentInput onSubmit={onSubmit} isAnswer={false} name={this.props.name}/></div>}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isUserAuth: state.userCabinet.isAuth,
    isProviderAuth: state.providerCabinet.isProviderAuth,
    id: state.userCabinet.id || state.providerCabinet.id,
    hobbyId: state.hobbyPage.id,
    name: state.auth.name || state.providerCabinet.name,
});
const mapDispatchToProps = (dispatch) => ({
    onUserFeedback: (idHobby, idUser, values) => dispatch(addUserFeedback(idHobby, idUser, values)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

