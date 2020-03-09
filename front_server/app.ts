import express, {NextFunction, Request, Response} from 'express';
import indexRouter from './routes/index';
import config from 'config';
import cookieParser from 'cookie-parser';
import logger from './utils/logger';


const app: express.Application = express();

const LISTENING_PORT = Number(config.get('port_front')) || 3001;

app.use(cookieParser());

app.use('/dist', express.static('dist', {
    etag: false,
}));

app.use('/public/images', express.static('images'));

app.listen(LISTENING_PORT, () => {
    logger.info(`Server start listening on PORT: ${LISTENING_PORT}, http://localhost:${LISTENING_PORT}`);
});

// routes
app.use('/', indexRouter);

// error middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.code === 'EBADCSRFTOKEN') {
        res.setHeader('csrf-token', req.csrfToken());
        res.status(401).end();
        return;
    }
    logger.error(err);
    res.status(500).send(err);
});
