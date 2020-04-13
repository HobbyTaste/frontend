import {Participants} from "../types/comment";
import {IComment} from "../types/comment";
import {IHobby} from "../types/hobby";
import {IUser} from "../types/user";
import {IProvider} from "../types/provider";
import Comment from "../models/comment";


import Hobby from "../models/hobby";
import User from "../models/user";
import Provider from "../models/provider";


export default class CommentService {

    static CreateUserComment = async function (userId: string, hobbyId: string, body: Partial<IComment>) {
        const type = Participants.user;
        const hobby: IHobby = Hobby.findById(hobbyId) as any;
        const user: IUser = User.findById(userId) as any;
        if (!hobby || !user) {
            //res.status(404).send('Не найдено такого элемента');
            return;
        }

        const newComment = new Comment({body, author: {id: userId, type}});
        const {_id: commentId} = await newComment.save();

        const nextHobbyComments = hobby.comments.concat(commentId);
        await Hobby.findByIdAndUpdate(hobbyId, {comments: nextHobbyComments});

        const nextUserComments = user.comments.concat(commentId);
        await User.findByIdAndUpdate(userId, {comments: nextUserComments});
        //res.status(200).send();
    };

    static CreateProviderComment = async function (providerId: string, relatedId: string, body: Partial<IComment>) {
        const type = Participants.provider;
        const related: IComment = Comment.findById(relatedId) as any;
        const provider: IProvider = Provider.findById(providerId) as any;
        if (!related || !provider) {
            //res.status(404).send('Не найдено такого элемента');
            return;
        }
        const hobby: IHobby = Hobby.findOne({comments: relatedId}) as any;

        const newComment = new Comment({body, author: {id: providerId, type}, related: relatedId});
        const {_id: commentId} = await newComment.save();

        const nextProviderComments = provider.comments.concat(commentId);
        await Provider.findByIdAndUpdate(providerId, {comments: nextProviderComments});

        const nextHobbyComments = hobby.comments.concat(commentId);
        await Hobby.findByIdAndUpdate(hobby._id, {comments: nextHobbyComments});
    };
}
