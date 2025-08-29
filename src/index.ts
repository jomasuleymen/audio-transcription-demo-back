import { appServer } from '@/server';

const server = appServer.listen(8080, () => {
	console.log(`Server running on port ${8080}`);
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
