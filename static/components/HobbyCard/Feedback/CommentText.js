import React, { Component } from "react";
import style from "./Feedback.css";
import Rating from "@material-ui/lab/Rating";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ButtonProvider from "../Button/ButtonProvider";
import { connect } from "react-redux";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import CommentInput from "./CommentInput";
import { addProviderResponse, addUserFeedback } from "../../../redux/actions/hobbyActions";

const useStyles = (theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        color: "rgba(0, 0, 0, 0.54)",
    },
    stars: {
        color: "rgba(0, 0, 0, 0.54)",
    },
    countStars: {
        margin: "0px 5px",
    },
});

class CommentText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAnswered: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleClick(event) {
        this.setState({ isAnswered: !this.state.isAnswered });
    }

    handleSubmit = (values) => {
        let today = new Date(), dataNow = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear() + ' ' + today.getHours() + ' ' + today.getMinutes();
        const body={
            text: values.TextFeedback,
            datetime: dataNow,
        }
        let hobbyId = this.props.hobbyId;
        let relatedId = this.props.commentsId[this.props.relatedIndex];
        if (this.props.commentsId[0].selfId) {
            hobbyId = this.props.commentsId[this.props.relatedIndex].hobbyId;
            relatedId = this.props.commentsId[this.props.relatedIndex].selfId;
        }
        this.props.onProviderResponse(hobbyId, body, relatedId);
    };

    render() {
        const classes = useStyles();
        let classContainer = style.containerComment;
        if (this.props.isItAnswerProvider) {
            classContainer += " " + style.containerAnswer;
        }
        return (
            <div>
                <div className={classContainer}>
                    <div className={style.info}>
                        <div className={style.containerInfo}>
                            <p className={style.icon}>
                                <AccountCircleIcon style={{ fontSize: 40 }}/>
                            </p>
                            <div className={style.infoData}>
                                <p className={style.userName}>{this.props.comment.name}</p>
                                <p className={style.data}> {this.props.comment.datetime}</p>
                            </div>
                        </div>
                        {this.props.isOwner && !this.props.isItAnswerProvider && !this.props.isHaveAnswer && (
                            <ButtonProvider
                                className={style.buttonContainer}
                                onClick={this.handleClick}
                                text="Ответить"
                            />
                        )}
                    </div>
                    {!this.props.isItAnswerProvider && (
                        <Rating
                            style={classes.stars}
                            size="small"
                            name="half-rating-read"
                            defaultValue={this.props.comment.evaluation}
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                            precision={0.5}
                            readOnly
                        />
                    )}
                    <div className={style.text}>{this.props.comment.text}</div>
                </div>
                {this.state.isAnswered && <CommentInput onSubmit={this.handleSubmit} isAnswer={true} name={this.props.name}/>}
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    commentsId: state.providerCabinet.isProviderInCabinet ? 
                state.providerCabinet.comments.commentsIds : 
                state.hobbyPage.commentsId,
    name: state.providerCabinet.name || state.userCabinet.name
});

const mapDispatchToProps = (dispatch) => ({
    onProviderResponse: (hobbyId,body, relatedId) => dispatch(addProviderResponse(hobbyId,body, relatedId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentText);
