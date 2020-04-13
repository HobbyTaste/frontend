import {connection as db} from 'mongoose';
import logger from '../utils/logger';
import {IComment, Participants} from "../types/comment";
import CommentSchema from "../schemas/comment";

CommentSchema.pre<IComment>('save', function() {
    if (this.author.type === Participants.user && this.evaluation == undefined) {
        logger.log(new Error('evaluation required'));
    }
    if (this.author.type == Participants.provider && this.relatedComment == undefined) {
        logger.log(new Error('no user comment to answer'));
    }
});

CommentSchema.statics.userCommentsCount = function(): number {
    return this.count({author: {
        type: Participants.user
    }})
};

const Comment = db.model<IComment>('Comment', CommentSchema);
export default Comment
