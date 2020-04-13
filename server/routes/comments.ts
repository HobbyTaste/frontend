import {Response, Router} from 'express';
import {Participants} from "../types/comment";
import CommentService from "../services/comment";
import {ICreateCommentRequest} from "../types/comment";
import Hobby from "../models/hobby";
import User from "../models/user";
import Provider from "../models/provider";
import Comment from "../models/comment";

const commentRouter: Router = Router();

/**
 * Создание комментария
 */
commentRouter.post('/create', async (req: ICreateCommentRequest, res: Response) => {
    try {
        if (!req.session || !req.session.user && !req.session.provider) {
            res.status(403).send('Неавторизированный');
            return;
        }
        const type = !!req.session.user ? Participants.user : Participants.provider;
        const {_id: authorId} = type === Participants.user ? req.session.user : req.session.provider;
        const CommentServiceInstance = new CommentService(Hobby, User, Provider, Comment);
        const {status, message} = await CommentServiceInstance.CreateComment(req.query.hobbyId, {
            author: {
                id: authorId,
                type
            },
            ...req.body,
            relatedComment: req.query.relatedId
        });
        res.status(status).send(message);
    } catch (e) {
        res.status(500).send(e);
    }
});

export default commentRouter
