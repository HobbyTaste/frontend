import {IHobby, IHobbyModel} from "../types/hobby";
import {IUserModel} from "../types/user";
import {IProviderModel} from "../types/provider";
import {ICommentInfo, ICommentModel, Participants} from "../types/comment";


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
        const body: {comments: ICommentInfo[]} = {comments: []}
        const hobby = await this.Hobby.findById(hobbyId);
        if (!hobby) {
            throw new Error('Не найдено такого элемента');
        }
        for (const commentId of hobby.comments) {
            const comment = await this.Comment.findById(commentId);
            if (!comment || comment.author.type !== Participants.user) {
                continue;
            }
            const user = await this.User.findById(comment.author.id);
            if (!user) {
                throw new Error('Сбой в работе запроса');
            }
            let answerInfo;
            if (comment.relatedComment) {
                const answer = await this.Comment.findById(comment.relatedComment);
                if (!answer) {
                    throw new Error('Сбой в работе запроса');
                }
                const provider = await this.Provider.findById(answer.author.id);
                if (!provider) {
                    throw new Error('Сбой в работе запроса');
                }
                answerInfo = {
                    providerId: answer.author.id,
                    name: provider.name,
                    datetime: answer.datetime,
                    avatar: provider.avatar,
                    text: answer.text
                }
            }
            body.comments.push({
                userId: comment.author.id,
                name: user.name,
                datetime: comment.datetime,
                avatar: user.avatar,
                text: comment.text,
                evaluation: comment.evaluation,
                answer: answerInfo
            });
        }
        return body;
    }

    async AddHobby(hobbyInfo: Partial<IHobby>, providerId: string) {
        const newHobby = new this.Hobby({...hobbyInfo, providerId});
        await newHobby.save();
    }
}
