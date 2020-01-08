import {Response, Request, Router} from 'express';
import multer from 'multer';
import config from 'config';

import User from '../models/user';
import {user as BASE_URL} from './routes.json';
import {uploadFileToS3} from '../utils/aws';
import bcrypt from "bcrypt";
import Hobby from '../models/hobby';

const userRouter: Router = Router();

const USER_URL_PAGES = {
    cabinet: `${BASE_URL}/cabinet`
};

const upload = multer({limits: {fieldSize: Number(config.get('aws.maxFileSize'))}});

userRouter.post('/login', async (req: Request, res: Response) => {
  if (req.session && req.session.user) {
    res.end();
    return;
  }
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if (!user) {
    res.status(400).json({
      login: 'Неверный логин',
      password: null,
    });
    return;
  }
  const isTruePassword = await user.checkPasswords(password);
  if (isTruePassword) {
      if (req.session) {
          req.session.user = user;
      }
      res.redirect(`${BASE_URL}/cabinet`);
      return;
  }
  res.status(400).json({
      login: null,
      password: 'Неверный пароль',
  })
});

userRouter.post('/create', upload.single('avatar'), async (req: Request, res: Response) => {
    const {...profile} = req.body;
    const file = req.file;
    if (!profile.email) {
        res.status(400).send('Email обязателен для регистрации');
        return;
    }
    const user = await User.findOne({email: profile.email});
    if (user) {
        res.status(400).send('Такой пользователь уже существует');
        return;
    }

    if (file) {
        profile.avatar = uploadFileToS3('users', file);
    }
    const newUser = new User({...profile});
    if (req.session) {
        req.session.user = newUser;
    }
    try {
        await newUser.save();
        res.redirect(USER_URL_PAGES.cabinet);
    } catch (e) {
        res.status(500).send(e);
    }
});

userRouter.post('/edit', upload.single('avatar'), async (req: Request, res: Response) => {
    const {...nextData} = req.body;
    const file = req.file;
    if (file) {
        nextData.avatar = await uploadFileToS3('users', file);
    }
    if (!req.session || !req.session.user) {
        res.status(403).send('Пользователь не авторизован');
        return;
    }
    if ('password' in nextData) {
        // генерируем соль
        const salt = await bcrypt.genSalt(Number(config.get('saltWorkFactor')));
        // получаем хэш пароля
        nextData.password = await bcrypt.hash(nextData.password, salt);
        console.log(nextData.password);
    }
    const {_id: id} = req.session.user;
    try {
        req.session.user = await User.findByIdAndUpdate(id, nextData, {new: true});
        res.end();
    } catch (e) {
        res.status(500).send(e);
    }
    res.end();
});

userRouter.get('/logout', (req: Request, res: Response) => {
    if (req.session) {
        req.session.user = null;
    }
    res.end();
});

interface IQueryInfo {
    id?: string;
}

userRouter.get('/info', async (req: Request, res: Response) => {
    const query: IQueryInfo = req.query;
    if (query.id) {
        const user = await User.findById(query.id);
        if (!user) {
            res.status(404).send('Не найден такой пользователь');
            return;
        }
        const {_id: id, name, email, avatar} = user;
        res.json({id, name, email, avatar});
        return;
    }
    if (req.session && req.session.user) {
        const {_id: id, name, email, avatar} = req.session.user;
        res.json({id, name, email, avatar});
        return;
    }
    res.status(403).send('Текущий пользователь не прошел авторизацию');
});


userRouter.get('/subscribe', async (req: Request, res: Response) => {
     if (!req.session || !req.session.user) {
         res.status(400).send('Пользователь не авторизован');
         return;
     }
     const {id: hobbyId} = req.query;
     if (!hobbyId) {
         res.status(400).send('Необходимо указать id хобби для подписки');
         return;
     }
     try {
         const hobbyToUpdate = await Hobby.findById(hobbyId);
         if (!hobbyToUpdate) {
             res.status(404).send('Такого хобби не найдено');
             return;
         }
         const {hobbies, _id: userId} = req.session.user;
         const nextHobbies = [...new Set(hobbies.concat(hobbyId))];
         const nextSubscribers = [...new Set(hobbyToUpdate.subscribers.concat(userId))];
         await Hobby.findByIdAndUpdate(hobbyId, nextSubscribers);
         req.session.user = await User.findByIdAndUpdate(userId, {hobbies: nextHobbies}, {new: true});
         res.status(200).end();
     } catch (e) {
         res.status(500).json(e);
     }
});

userRouter.get('/hobbies', async (req: Request, res: Response) => {
    if (!req.session || !req.session.user) {
        res.status(400).send('Пользователь не авторизован');
        return;
    }
    const {hobbies: hobbyIds} = req.session.user;
    try {
        const hobbies = await Hobby.find({_id: {$in: hobbyIds}});
        res.json(hobbies);
    } catch (e) {
        res.status(500).json(e);
    }
});

userRouter.post('/upload', upload.single('avatar'), async (req: Request, res: Response) => {
    if (!req.session || !req.session.user) {
        res.status(403).send('Текущий пользователь не прошел авторизацию');
        return;
    }
    if (!req.file) {
        res.status(400);
        return;
    }
    const file = req.file;
    if (!file.mimetype.match(/images/)) {
        res.status(400).send('Неверный формат изображения');
        return;
    }
    const {_id: userId} = req.session.user;
    try {
        const url = await uploadFileToS3('users', req.file);
        req.session.user = await User.findByIdAndUpdate(userId, {avatar: url}, {new: true});
        res.json({avatar: url});
    } catch (e) {
        res.status(500).send(e);
    }
});

export default userRouter;
