import {IHobby, IHobbyModel} from "../types/hobby";
import {IUserModel} from "../types/user";
import {IProviderModel} from "../types/provider";
import {ICommentInfo, ICommentModel, Participants} from "../types/comment";
import {isNil} from 'lodash';
import {uploadFileToS3} from "../utils/aws";


export default class HobbyService {
    Hobby: IHobbyModel;
    User: IUserModel;
    Provider: IProviderModel;
    Comment: ICommentModel;

    constructor(Hobby: IHobbyModel, User: IUserModel, Provider: IProviderModel, Comment: ICommentModel) {
        this.Hobby = Hobby;
        this.Provider = Provider;
        this.User = User;
        this.Comment = Comment;
    }

    async GetComments(hobbyId: string) {
        const comments: ICommentInfo[] = [];
        const hobby = await this.Hobby.findById(hobbyId);
        if (!hobby) {
            throw {status: 404, message: 'Не найдено такого элемента'};
        }
        for (const commentId of hobby.comments) {
            const comment = await this.Comment.findById(commentId);
            if (comment && comment.author.type === Participants.user) {
                comments.push(await comment.repr())
            }
        }
        return comments;
    }

    async AddHobby(hobbyInfo: Partial<IHobby>, providerId: string, file?: Express.Multer.File) {
        if (file) {
            hobbyInfo.avatar = await uploadFileToS3('hobbies', file);
        }
        const newHobby = new this.Hobby({...hobbyInfo, providerId});
        newHobby.save();
    }

    async FindByLabel(hobbyInfo: Partial<IHobby>) {
        const numberMetroId = Number(hobbyInfo.metroId);
        if (!isNil(hobbyInfo.label)) {
            return isNaN(numberMetroId)
                ? this.Hobby.findByLabel(hobbyInfo.label)
                : this.Hobby.findByLabelWithGeo(hobbyInfo.label, numberMetroId);
        } else {
            throw {status: 400, message: `typeof label = ${typeof hobbyInfo.label}`}
        }
    }

    async HobbyInfo(hobbyId: string) {
        return this.Hobby.findById(hobbyId);
    }

    async Filtered(filters: any) {
        return this.Hobby.find(filters);
    }

    async EditHobby(hobbyId: string, updateParams: IHobby) {
        return this.Hobby.findByIdAndUpdate(hobbyId, updateParams);
    }

    async Subscribe(hobbyId: string, userId: string) {
        const hobby = await this.Hobby.findById(hobbyId);
        if (!hobby) {
            throw {status: 404, message: 'Не найдено такого элемента'}
        }
        const nextSubscribers = hobby.subscribers.concat(userId);
        this.Hobby.findByIdAndUpdate(hobbyId, {subscribers: nextSubscribers})
    }
}

