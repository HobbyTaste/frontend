import {connection as db} from 'mongoose';
import {escapeRegExp} from 'lodash';
import {IHobby, IHobbyModel} from "../types/hobby";
import HobbySchema from "../schemas/hobby";
import Comment from "./comment";
import {Participants} from "../types/comment";

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

HobbySchema.methods.getRating = async function() {
    let evalSum = 0;
    for (const commentId of this.comments) {
        const comment = await Comment.findById(commentId);
        if (!!comment && comment.author.type === Participants.user) {
            evalSum += comment.evaluation as any;
        }
    }
    this.rating = evalSum / await Comment.userCommentsCount();
};

const obj: any = {};
const {}: IHobbyModel = obj;

const Hobby: IHobbyModel = db.model<IHobby, IHobbyModel>('Hobby', HobbySchema);
export default Hobby;
