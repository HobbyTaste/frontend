import {Response, Request, Router} from 'express';
import multer from 'multer';
import config from 'config';
import {user as BASE_URL} from './routes.json';
import UserService from "../services/user";
import {User, Provider, Comment, Hobby} from '../models'


const userRouter: Router = Router();
const UserServiceInstance = new UserService(Hobby, User, Provider, Comment);

const USER_URL_PAGES = {
    cabinet: `${BASE_URL}/cabinet`
};

const upload = multer({limits: {fieldSize: Number(config.get('aws.maxFileSize'))}});

userRouter.post('/login', async (req: Request, res: Response) => {
    if (req.session?.user) {
        res.end();
        return;
    }
    try {
        const {email, password} = req.body;
        if (req.session) {
            req.session.user = await UserServiceInstance.LoginUser(email, password);
        }
        res.redirect(`${BASE_URL}/cabinet`);
    } catch (e) {
        if (e.status && e.message) {
            res.status(e.status).send(e.message)
        } else {
            res.status(500).send(e)
        }
    }
});

userRouter.post('/create', upload.single('avatar'), async (req: Request, res: Response) => {
    try {
        const {...profile} = req.body;
        const file = req.file;
        const newUser = await UserServiceInstance.CreateUser(profile, file);
        if (req.session) {
            req.session.user = newUser;
        }
        res.redirect(USER_URL_PAGES.cabinet);
    } catch (e) {
        if (e.status && e.message) {
            res.status(e.status).send(e.message)
        } else {
            res.status(500).send(e)
        }
    }
});

userRouter.post('/edit', upload.single('avatar'), async (req: Request, res: Response) => {
    if (!req.session?.user) {
        res.status(403).send('Пользователь не авторизован');
        return;
    }
    try {
        const {...nextData} = req.body;
        const file = req.file;
        const {_id: id} = req.session.user;
        req.session.user = await UserServiceInstance.EditUser(id, nextData, file);
        res.end();
    } catch (e) {
        res.status(500).send(e);
    }
});

userRouter.get('/logout', (req: Request, res: Response) => {
    if (req.session) {
        req.session.user = null;
    }
    res.end();
});

userRouter.get('/info', async (req: Request, res: Response) => {
    try {
        if (req.query.id) {
            res.json(await UserServiceInstance.UserInfo(req.query.id));
            return;
        }
        if (req.session?.user) {
            const {_id: id, name, email, avatar} = req.session.user;
            res.json({id, name, email, avatar});
            return;
        }
        res.status(403).send('Текущий пользователь не прошел авторизацию');
    } catch (e) {
        if (e.status && e.message) {
            res.status(e.status).send(e.message)
        } else {
            res.status(500).send(e)
        }
    }
});

userRouter.get('/subscribe', async (req: Request, res: Response) => {
     if (!req.session?.user) {
         res.status(400).send('Пользователь не авторизован');
         return;
     }
     try {
         const {id: hobbyId} = req.query;
         req.session.user = await UserServiceInstance.HobbySubscribe(req.session.user, hobbyId);
         res.status(200).end();
     } catch (e) {
         if (e.status && e.message) {
             res.status(e.status).send(e.message)
         } else {
             res.status(500).json(e)
         }
     }
});

userRouter.get('/hobbies', async (req: Request, res: Response) => {
    if (!req.session?.user) {
        res.status(400).send('Пользователь не авторизован');
        return;
    }
    try {
        res.json(await UserServiceInstance.GetHobbies(req.session.user));
    } catch (e) {
        res.status(500).send(e)
    }
});

userRouter.post('/upload', upload.single('avatar'), async (req: Request, res: Response) => {
    if (!req.session?.user) {
        res.status(403).send('Текущий пользователь не прошел авторизацию');
        return;
    }
    try {
        req.session.user = await UserServiceInstance.AvatarUpload(req.session.user, req.file)
        res.json({avatar: req.session.user.avatar});
    } catch (e) {
        if (e.status && e.message) {
            res.status(e.status).send(e.message)
        } else {
            res.status(500).send(e)
        }
    }
});

export default userRouter;
