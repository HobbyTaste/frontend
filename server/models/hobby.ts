import {connection as db} from 'mongoose';
import mongoose from 'mongoose'
import {escapeRegExp} from 'lodash';
import {IHobby, IHobbyModel} from "../types/hobby";
import HobbySchema from "../schemas/hobby";
import {IComment, Participants} from "../types/comment";

/**
 * Поиск хобби по названию в БД
 * @param label
 */
HobbySchema.statics.findByLabel = function(label: string): Promise<IHobby> {
    return this.find({label: new RegExp(escapeRegExp(label), 'i')});
}

/**
 * Поиск названию хобби по id-метро
 * (берущимся отсюда: https://data.mos.ru/classifier/7704786030-stantsii-moskovskogo-metropolitena)
 * @param label
 * @param metroId
 */
HobbySchema.statics.findByLabelWithGeo = function(label: string, metroId: number): Promise<IHobby> {
    return this.find({
        label: new RegExp(escapeRegExp(label), 'i'),
        metroId: metroId,
    });
};

HobbySchema.methods.userCommentsCount = async function() {
    const commentIds = this.comments;
    return mongoose.model('Comment').count({
        _id: {$in: commentIds},
        author: {
            type: Participants.user
        }
    })
}

HobbySchema.methods.updateRating = async function() {
    let evalSum = 0;
    let evalCount = 0;
    for (const commentId of this.comments) {
        const comment = await mongoose.model('Comment').findById(commentId) as IComment;
        if (comment && comment.evaluation) {
            evalSum += comment.evaluation;
            evalCount += 1;
        }
    }
    this.rating = evalSum / evalCount;
};

HobbySchema.methods.userComments = async function() {
    return [];
}

const obj: any = {};
const {}: IHobbyModel = obj;

const Hobby = db.model<IHobby, IHobbyModel>('Hobby', HobbySchema);
export default Hobby;
