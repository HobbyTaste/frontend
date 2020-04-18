import {connection as db} from 'mongoose';
import mongoose from 'mongoose'
import logger from '../utils/logger';
import {IComment, ICommentModel, Participants} from "../types/comment";
import CommentSchema from "../schemas/comment";
import {IProvider} from "../types/provider";
import {IUser} from "../types/user";


CommentSchema.pre<IComment>('save', function() {
    if (this.author.type === Participants.user && this.evaluation == undefined) {
        logger.log(new Error('evaluation required'));
    }
    if (this.author.type == Participants.provider && this.relatedComment == undefined) {
        logger.log(new Error('no user comment to answer'));
    }
});

CommentSchema.methods.repr = async function() {
    let answerInfo = undefined;
    const author = this.author.type === Participants.user
    ? await mongoose.model('User').findById(this.author.id) as IUser
    : await mongoose.model('Provider').findById(this.author.id) as IProvider

    if (this.author.type === Participants.user) {
        if (this.relatedComment) {
            const answer = await this.model('Comment').findById(this.relatedComment) as IComment;
            const provider = await mongoose.model('Provider').findById(answer.author.id) as IProvider;
            answerInfo = {
                providerId: answer.author.id,
                name: provider.name,
                datetime: answer.datetime,
                avatar: provider.avatar,
                text: answer.text
            }
        }
    }
    return {
        userId: this.author.id,
        name: author?.name || 'undefined',
        datetime: this.datetime,
        avatar: author?.avatar || 'none',
        text: this.text,
        evaluation: this.evaluation,
        answer: answerInfo
    }
}

const Comment = db.model<IComment, ICommentModel>('Comment', CommentSchema);
export default Comment
