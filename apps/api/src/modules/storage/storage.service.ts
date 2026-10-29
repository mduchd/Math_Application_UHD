import { Injectable, Logger } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly s3: S3Client;
  private readonly bucket: string = 'assets';

  constructor() {
    const endpoint = process.env.AWS_ENDPOINT_URL_S3;
    const region = process.env.AWS_REGION || 'us-east-2';
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID || '';
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || '';

    this.s3 = new S3Client({
      forcePathStyle: true, // Required for Neon Object Storage
      region,
      endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    this.logger.log(`Neon Object Storage initialized on bucket '${this.bucket}' (${endpoint})`);
  }

  async uploadFile(key: string, body: Buffer | Uint8Array | string, contentType?: string) {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: typeof body === 'string' ? Buffer.from(body) : body,
      ContentType: contentType || 'application/octet-stream',
    });

    return this.s3.send(command);
  }

  async getFile(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    const response = await this.s3.send(command);
    return response.Body;
  }

  async getPresignedDownloadUrl(key: string, expiresInSeconds: number = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    return getSignedUrl(this.s3, command, { expiresIn: expiresInSeconds });
  }

  async getPresignedUploadUrl(
    key: string,
    contentType: string,
    expiresInSeconds: number = 900,
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
    });

    return getSignedUrl(this.s3, command, { expiresIn: expiresInSeconds });
  }

  async testConnection(): Promise<{ success: boolean; objectCount: number; message: string }> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: this.bucket,
        MaxKeys: 10,
      });

      const result = await this.s3.send(command);
      return {
        success: true,
        objectCount: result.KeyCount || 0,
        message: `Successfully connected to Neon Object Storage bucket '${this.bucket}'`,
      };
    } catch (error: any) {
      this.logger.error(`Neon Object Storage test failed: ${error.message}`);
      return {
        success: false,
        objectCount: 0,
        message: error.message,
      };
    }
  }
}
