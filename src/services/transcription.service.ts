import { JobStatus, TranscriptionJob } from '@/graphql/graphql.types';
import { S3_BUCKET_NAMES } from '@shared/constants';
import { sleep } from '@shared/utils/system.util';
import { v4 as uuidv4 } from 'uuid';
import { generateS3PresignedUrl, getS3ObjectUrl } from './s3.service';

const jobs: TranscriptionJob[] = [];

export const createTranscriptionJob = async (
	fileName: string,
	contentType: string
): Promise<{
	job: TranscriptionJob;
	uploadUrl: string;
}> => {
	const { uploadUrl, key } = await generateS3PresignedUrl(
		S3_BUCKET_NAMES.TRANSCRIPTION_JOBS,
		fileName,
		contentType
	);

	const job: TranscriptionJob = {
		id: uuidv4(),
		fileName,
		status: JobStatus.Waiting,
		s3Url: getS3ObjectUrl(S3_BUCKET_NAMES.TRANSCRIPTION_JOBS, key),
	};

	jobs.unshift(job);

	return {
		job,
		uploadUrl,
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
	transcribeAudio(job.s3Url)
		.then((transcriptionText) => {
			job.transcriptionText = transcriptionText;
			job.status = JobStatus.Completed;
		})
		.catch(() => {
			// mark job as failed
		});

	return job;
};

const transcribeAudio = async (s3Url: string): Promise<string> => {
	await sleep(15000);

	return `Hello world! ${new Date().toLocaleString('ru-RU')}`;
};
