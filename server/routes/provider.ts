import {Response, Request, Router} from 'express';
import {IProvider} from "../types/provider";
import multer from "multer";
import config from "config";
import ProviderService from "../services/provider"
import {User, Provider, Comment, Hobby} from '../models'


const providerRouter: Router = Router();
const ProviderServiceInstance = new ProviderService(Hobby, User, Provider, Comment)
const upload = multer({limits: {fieldSize: Number(config.get('aws.maxFileSize'))}});

providerRouter.post('/create', upload.single('avatar'), async (req: Request, res: Response) => {
    try {
        const {...profile}: IProvider = req.body;
        const file = req.file;
        const newProvider = await ProviderServiceInstance.CreateProvider(profile, file);
        if (req.session) {
            req.session.provider = newProvider;
        }
        res.redirect('/provider/cabinet');
    } catch (e) {
        if (e.status && e.message) {
            res.status(e.status).send(e.message);
        } else {
            res.status(500).send(e);
        }
    }
});

providerRouter.post('/login', async (req: Request, res: Response) => {
    if (req.session?.provider) {
        res.end();
        return;
    }
    try {
        const {email, password} = req.body;
        if (req.session) {
            req.session.provider = await ProviderServiceInstance.LoginProvider(email, password);
        }
        res.redirect(`/provider/cabinet`);
    } catch (e) {
        if (e.status && e.message) {
            res.status(e.status).send(e.message)
        } else {
            res.status(500).send(e)
        }
    }
});

providerRouter.get('/logout', (req: Request, res: Response) => {
    if (req.session) {
        req.session.provider = null;
    }
    res.end();
});

providerRouter.get('/info', async (req: Request, res: Response) => {
    try {
        if (req.query.id) {
            res.json(await ProviderServiceInstance.ProviderInfo(req.query.id))
            return;
        }
        if (req.session?.provider) {
            const {_id: id, password, ...restProperties} = req.session.provider;
            res.json({id, ...restProperties});
            return;
        }
        res.status(403).send('Текущий партнер не прошел авторизацию');
    } catch (e) {
        if (e.status && e.message) {
            res.status(e.status).send(e.message)
        } else {
            res.status(500).send(e)
        }
    }
});

providerRouter.post('/edit', upload.single('avatar'), async (req: Request, res: Response) => {
    if (!req.session?.provider) {
        res.status(403).send('Партнер не авторизован');
        return;
    }
    try {
        const {...nextData} = req.body;
        const file = req.file;
        const {_id: id} = req.session.provider;
        req.session.provider = await ProviderServiceInstance.EditProvider(id, nextData, file);
        res.end();
    } catch (e) {
        res.status(500).send(e);
    }
    res.end();
});

providerRouter.get('/hobbies', async (req: Request, res: Response) => {
    if (!req.session?.provider) {
        res.status(400).send('Партнер не авторизован');
        return;
    }
    const {_id: owner} = req.session.provider;
    res.json(await ProviderServiceInstance.GetHobbies(owner));
});

export default providerRouter;
