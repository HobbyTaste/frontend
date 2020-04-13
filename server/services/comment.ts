import {IComment, ICommentModel, Participants} from "../types/comment";
import {IHobbyModel} from "../types/hobby";
import {IUserModel} from "../types/user";
import {IProviderModel} from "../types/provider";

interface HTTPResponse {
    status: number;
    message: string;
}

export default class CommentService {
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

    async CreateComment(hobbyId: string, CommentFields: Partial<IComment>): Promise<HTTPResponse> {
        const hobby = await this.Hobby.findById(hobbyId);
        const author = CommentFields.author?.type === Participants.user
            ? await this.User.findById(CommentFields.author.id)
            : await this.Provider.findById(CommentFields.author?.id);
        if (!hobby || !author) {
            return {status: 404, message: 'Не найдено такого элемента'};
        }
        const newComment = new this.Comment(CommentFields);
        const {_id: commentId} = await newComment.save();

        await this.Hobby.findByIdAndUpdate(hobbyId, {comments: hobby.comments.concat(commentId)});

        if (CommentFields.author?.type === Participants.user) {
            await this.User.findByIdAndUpdate(CommentFields.author?.id, {comments: author.comments.concat(commentId)});
        } else {
            await this.Provider.findByIdAndUpdate(CommentFields.author?.id, {comments: author.comments.concat(commentId)});
        }
        return {status: 200, message: ''}
    }
}
