import express, { type Express } from 'express';

const appServer: Express = express();

appServer.use(express.json());

export { appServer };
