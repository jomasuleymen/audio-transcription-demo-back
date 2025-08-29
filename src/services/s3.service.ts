import { env } from '@/shared/utils/envConfig';
import {
	CreateBucketCommand,
	HeadBucketCommand,
	PutObjectCommand,
	S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3_BUCKET_NAMES } from '@shared/constants';
import { v4 as uuidv4 } from 'uuid';

const s3Client = new S3Client({
	endpoint: env.S3_ENDPOINT,
	credentials: {
		accessKeyId: env.S3_ACCESS_KEY_ID,
		secretAccessKey: env.S3_SECRET_ACCESS_KEY,
	},
	region: env.S3_REGION,
	forcePathStyle: true,
});

export const generateS3PresignedUrl = async (
	bucketName: string,
	fileName: string,
	contentType: string,
	ttl: number = 900
): Promise<{ uploadUrl: string; key: string }> => {
	const key = uuidv4();

	const command = new PutObjectCommand({
		Bucket: bucketName,
		Key: key,
		ContentType: contentType,
		ContentDisposition: `inline; filename="${fileName}"`,
	});

	const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: ttl });

	return { uploadUrl, key };
};

export const getS3ObjectUrl = (bucketName: string, key: string): string => {
	return `${env.S3_ENDPOINT}/${bucketName}/${key}`;
};

export const ensureBucketExists = async (bucketName: string): Promise<void> => {
	try {
		await s3Client.send(new HeadBucketCommand({ Bucket: bucketName }));
	} catch {
		try {
			await s3Client.send(new CreateBucketCommand({ Bucket: bucketName }));
		} catch (createError) {
			throw createError;
		}
	}
};

// Ensure all buckets exist
Object.values(S3_BUCKET_NAMES).forEach((bucketName) => {
	ensureBucketExists(bucketName);
});
