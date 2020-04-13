import {Response, Router} from 'express';
import {Participants} from "../types/comment";
import CommentService from "../services/comment";
import {ICreateCommentRequest} from "../types/comment";

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
        switch (type) {
            case Participants.user: {
                await CommentService.CreateUserComment(authorId, req.query, {...req.body});
                break;
            }
            case Participants.provider: {
                await CommentService.CreateProviderComment(authorId, req.query, {...req.body});
                break;
            }
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

export default commentRouter
