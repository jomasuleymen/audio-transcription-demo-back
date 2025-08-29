import { JobStatus, TranscriptionJob } from '@/graphql/graphql.types';
import { v4 as uuidv4 } from 'uuid';

const jobs: TranscriptionJob[] = [];

export const createTranscriptionJob = async (): Promise<{
	job: TranscriptionJob;
	uploadUrl: string;
}> => {
	const job: TranscriptionJob = {
		id: uuidv4(),
		s3Url: 'test',
		status: JobStatus.Waiting,
	};

	jobs.push(job);

	return {
		job,
		uploadUrl: 'test',
	};
};

export const getTranscriptionJob = async (id: string): Promise<TranscriptionJob | null> => {
	return jobs.find((job) => job.id === id) ?? null;
};

export const getTranscriptionJobs = async (): Promise<TranscriptionJob[]> => {
	return jobs;
};

export const confirmUpload = async (id: string): Promise<TranscriptionJob> => {
	const job = jobs.find((job) => job.id === id);

	if (!job) {
		throw new Error('Job not found');
	}

	job.status = JobStatus.Processing;

	setTimeout(() => {
		job.status = JobStatus.Completed;
		job.transcriptionText = 'This is a test transcription';
	}, 15000);

	return job;
};
