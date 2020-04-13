import expressLoader from './express'
import mongooseLoader from './mongoose'
import express from 'express'
import config from 'config'


const dbUser: string = process.env.DB_USER || config.has('secrets') && config.get('secrets.dbUser') || '';
const dbPassword: string = process.env.DB_PASSWORD || config.has('secrets') && config.get('secrets.dbPassword') || '';
export let dbHost: string = config.get('dbHost');

dbHost = dbHost.replace(/{dbUser}/, dbUser);
dbHost = dbHost.replace(/{dbPassword}/, dbPassword);

export const init = async (app: express.Application) => {
    mongooseLoader();
    expressLoader(app);
    return app
}