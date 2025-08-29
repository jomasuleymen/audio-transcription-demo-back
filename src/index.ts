import { appServer } from '@/server';
import { env } from '@shared/utils/envConfig';

const server = appServer.listen(env.PORT, () => {
	console.log(`Server running on port ${env.PORT}`);
});

const onCloseSignal = () => {
	console.log('sigint received, shutting down');
	server.close(() => {
		console.log('server closed');
		process.exit();
	});
	setTimeout(() => process.exit(1), 10000).unref();
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);
