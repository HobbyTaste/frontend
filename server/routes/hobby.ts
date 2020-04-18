import {Router, Request, Response} from 'express';
import {IHobby} from "../types/hobby";
import multer from "multer";
import config from "config";
import logger from "../utils/logger";
import HobbyService from "../services/hobby";
import {Comment, Hobby, Provider, User} from "../models";


const hobbyRouter: Router = Router();
const HobbyServiceInstance = new HobbyService(Hobby, User, Provider, Comment);
const upload = multer({limits: {fieldSize: Number(config.get('aws.maxFileSize'))}});

/**
 * Добавление нового хобби в БД
 */
hobbyRouter.post('/add', upload.single('avatar'), async (req: Request, res: Response) => {
    if (!req.session?.provider) {
        res.status(403).send('Партнер не авторизован');
        return;
    }
    try {
        const hobbyInfo: Partial<IHobby> = {...req.body};
        const file = req.file;
        const {_id: owner} = req.session.provider;
        await HobbyServiceInstance.AddHobby(hobbyInfo, owner, file);
        res.status(200).send();
    } catch (e) {
        res.status(500).send(e);
    }
});

/**
 * Поиск хобби по вхождению в него слова
 * label - название хобби (возможно только часть)
 * metroId - id-метро берущийся из стороннего API
 */
hobbyRouter.get('/find', async (req: Request, res: Response) => {
    try {
        const {label, metroId}: Partial<IHobby> = req.query;
        const hobbies = await HobbyServiceInstance.FindByLabel({label, metroId});
        res.json(hobbies);
    } catch (e) {
        if (e.status && e.message) {
            res.status(e.status).send(e.message);
        } else {
            res.status(500).send(e);
        }
    }
});

/**
 * Поиск хобби с нативной фильтрацией
 */
hobbyRouter.get('/filter', async (req: Request, res: Response) => {
    try {
        const {...filters} = req.query;
        res.json(await HobbyServiceInstance.Filtered(filters));
    } catch (e) {
        logger.error(e);
        res.status(500).json(e);
    }
});


/**
 * Возвращает все хобби из БД
 */
hobbyRouter.get('/all', async (req: Request, res: Response) => {
    try {
        res.json(await HobbyServiceInstance.Filtered({}));
    } catch (e) {
        res.status(500).send(e);
    }
    return;
});

/**
 * Возвращает информацию по конкретному хобби
 * id - параметр GET запроса
 */
hobbyRouter.get('/info', async (req: Request, res: Response) => {
    try {
        const {id} = req.query;
        res.json(await HobbyServiceInstance.HobbyInfo(id));
    } catch (e) {
        res.status(500).send(e);
    }
});

/**
 * Обновляет данные по хобби и его id
 * id - параметр запроса
 */
hobbyRouter.post('/edit', async (req: Request, res: Response) => {
    try {
        const {id} = req.query;
        const updateParams: IHobby = {...req.body};
        await HobbyServiceInstance.EditHobby(id, updateParams);
        res.end();
    } catch (e) {
        res.status(500).send(e);
    }
});

hobbyRouter.get('/subscribe', async (req: Request, res: Response) => {
    if (!req.session?.user) {
        res.status(403).send('Пользователь не авторизирован');
        return;
    }
    try {
        const {_id: userId} = req.session.user;
        const {id} = req.query;
        await HobbyServiceInstance.Subscribe(id, userId);
    } catch (e) {
        if (e.status && e.message) {
            res.status(e.status).send(e.message);
        } else {
            res.status(500).send(e);
        }
    }
});

export default hobbyRouter;
