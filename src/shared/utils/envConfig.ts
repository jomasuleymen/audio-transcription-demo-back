import dotenv from 'dotenv';
import { z } from 'zod';
import { Env } from '../constants';

dotenv.config();

const envSchema = z.object({
	NODE_ENV: z.enum(Env).default(Env.DEVELOPMENT),
	PORT: z.coerce.number().int().positive().default(8080),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error(
		'❌ Invalid environment variables:',
		JSON.stringify(z.treeifyError(parsedEnv.error), null, 2)
	);
	throw new Error('Invalid environment variables');
}

export const env = {
	...parsedEnv.data,
	isDevelopment: parsedEnv.data.NODE_ENV === Env.DEVELOPMENT,
	isProduction: parsedEnv.data.NODE_ENV === Env.PRODUCTION,
};
