import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
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

const typeDefs = mergeTypeDefs(loadFilesSync('src/**/*.{graphql,gql}'));
const resolvers = mergeResolvers(loadFilesSync('src/**/*.resolver.ts'));
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

await server.start();

appServer.use('/graphql', expressMiddleware(server));

export { appServer };
