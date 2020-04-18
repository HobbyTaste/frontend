import {Response, Router} from 'express';
import {Participants} from "../types/comment";
import CommentService from "../services/comment";
import {ICreateCommentRequest} from "../types/comment";
import {Hobby, User, Provider, Comment} from "../models"


const CommentServiceInstance = new CommentService(Hobby, User, Provider, Comment)
const commentRouter: Router = Router();

/**
 * Создание комментария
 */
commentRouter.post('/create', async (req: ICreateCommentRequest, res: Response) => {
    if (!req.session?.user && !req.session?.provider) {
        res.status(403).send('Неавторизированный');
        return;
    }
    try {
        const type = req.session.user ? Participants.user : Participants.provider;
        const {_id: authorId} = type === Participants.user ? req.session.user : req.session.provider;
        await CommentServiceInstance.CreateComment(req.query.hobbyId, {
            author: {id: authorId, type},
            ...req.body,
            relatedComment: req.query.relatedId
        });
        res.status(200).send();
    } catch (e) {
        if (e.status && e.message) {
            res.status(e.status).send(e.message);
        } else {
            res.status(500).send(e);
        }
    }
});

export default commentRouter
