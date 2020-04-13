import {connection as db} from 'mongoose';
import {escapeRegExp} from 'lodash';
import {IHobby, IHobbyModel} from "../types/hobby";
import HobbySchema from "../schemas/hobby";

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
    return 0;
};

const obj: any = {};
const {}: IHobbyModel = obj;

const Hobby: IHobbyModel = db.model<IHobby, IHobbyModel>('Hobby', HobbySchema);
export default Hobby;
