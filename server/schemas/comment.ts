import {IComment, Participants} from "../types/comment";
import {Schema} from 'mongoose'

const CommentSchema: Schema<IComment> = new Schema({
    author: {
        type: {
            type: Number,
            enum: Object.values(Participants)
        },
        id: {
            type: Schema.Types.ObjectId
        }
    },
    text: {
        type: String,
        required: true
    },
    datetime: {
        type: String,
        required: true
    },
    evaluation: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },
    relatedComment: {
        type: Schema.Types.ObjectId,
    }
});

export default CommentSchema
