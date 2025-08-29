import { Resolvers } from '@/graphql/graphql.types';
import {
	confirmUpload,
	createTranscriptionJob,
	getTranscriptionJob,
	getTranscriptionJobs,
} from '@services/transcription.service';

export const resolvers: Resolvers = {
	Query: {
		jobs: () => getTranscriptionJobs(),
		job: (_, { id }) => getTranscriptionJob(id),
	},

	Mutation: {
		createTranscriptionJob: async () => {
			return createTranscriptionJob();
		},

		confirmFileUpload: (_, { id }) => {
			return confirmUpload(id);
		},
	},
};
