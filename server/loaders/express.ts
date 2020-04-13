import express, {Request, Response, NextFunction} from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import routes from "../routes/routes.json";
import csrf from 'csurf';
import connectMongo from 'connect-mongo';

import logger from "../utils/logger";
import indexRouter from "../routes";
import hobbyRouter from "../routes/hobby";
import providerRouter from "../routes/provider";
import userRouter from "../routes/user";
import commentRouter from "../routes/comments";
import {dbHost} from "./index";


export default async (app: express.Application) => {
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());

    const MongoStore = connectMongo(expressSession);
    app.use(expressSession({
        secret: 'pugs do drugs',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            url: dbHost
        })
    }));
    app.use(csrf());

    app.use('/dist', express.static('dist', {
        etag: false,
    }));
    app.use('/public/images', express.static('images'));

    app.use(routes.index, indexRouter);
    app.use(routes.hobby, hobbyRouter);
    app.use(routes.provider, providerRouter);
    app.use(routes.user, userRouter);
    app.use(routes.comment, commentRouter);

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        if (err.code === 'EBADCSRFTOKEN') {
            res.setHeader('csrf-token', req.csrfToken());
            res.status(401).end();
            return;
        }
        logger.error(err);
        res.status(500).send(err);
    });
}
