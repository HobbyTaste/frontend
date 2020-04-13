import mongoose from 'mongoose'
import logger from "../utils/logger"
import {dbHost} from "./index";


export default async () => {
    try {
        await mongoose.connect(dbHost, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        logger.info(`Connect to mongoDB: success`)
    } catch (e) {}
}