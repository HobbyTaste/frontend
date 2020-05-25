import  React, {Component} from 'react'
import style from './Feedback.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {reset, reduxForm } from 'redux-form';
import FormInput from './FormInput';
import { format } from '../../../utils/functions';

class CommentInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isAnswer: props.isAnswer,
            userName: props.name,
        };
    }


    render() {

        const {handleSubmit, reset} = this.props;

        let today = new Date(), dataNow = 
            today.getDate() + '.' +
            format(today.getMonth() + 1) + '.' + 
            today.getFullYear() + ' ' + 
            format(today.getHours()) + ':' + 
            format(today.getMinutes());

        let classContainer = style.container +' '+ style.containerComment;
        if (this.state.isAnswer) {
            classContainer += (' ' + style.containerAnswer);
        }
        return (<div className={classContainer} >
                <div className={style.info}>
                    <div className={style.containerInfo}>
                        <p className={style.icon}><AccountCircleIcon style={{ fontSize: 40 }}/></p>
                        <div className={style.infoData}>
                            <p className={style.userName}>{this.state.userName}</p>
                            <p className={style.data}> {dataNow}</p>
                        </div>
                    </div>
                </div>
                <FormInput handleSubmit={handleSubmit} reset = {reset} isAnswer = {this.state.isAnswer}/>
            </div>
        )
    }
}

const afterSubmit = (result, dispatch) =>{
    dispatch(reset('addFeedback'));}

CommentInput = reduxForm({ form: 'addFeedback', onSubmitSuccess: afterSubmit})(CommentInput);

export default CommentInput;
