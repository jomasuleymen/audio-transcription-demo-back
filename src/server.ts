import { env } from '@shared/utils/envConfig';
import cors from 'cors';
import express, { type Express } from 'express';

const appServer: Express = express();

appServer.use(
	cors({
		origin: env.CORS_ORIGIN,
	})
);
appServer.use(express.json());

export { appServer };
