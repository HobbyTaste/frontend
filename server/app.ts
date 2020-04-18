import express from 'express';
import config from 'config';
import * as loaders from './loaders';
import logger from "./utils/logger";

const LISTENING_PORT = process.env.PORT || Number(config.get('port')) || 3000;

async function startServer() {
    const app = express();
    await loaders.init(app);

    app.listen(LISTENING_PORT, () => {
        logger.info(`Server start listening on PORT: ${LISTENING_PORT}, http://localhost:${LISTENING_PORT}`);
    })
}

startServer()
