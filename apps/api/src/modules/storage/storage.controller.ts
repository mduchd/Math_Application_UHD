import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get('status')
  async getStatus() {
    const test = await this.storageService.testConnection();
    return {
      bucket: 'assets',
      endpoint: process.env.AWS_ENDPOINT_URL_S3,
      region: process.env.AWS_REGION,
      status: test.success ? 'connected' : 'error',
      details: test.message,
      objectCount: test.objectCount,
    };
  }

  @Post('test-upload')
  async testUpload(@Body() body: { filename?: string; content?: string }) {
    const filename = body.filename || `test_${Date.now()}.txt`;
    const content = body.content || 'Hello from Kid E-Learning on Neon Object Storage!';
    await this.storageService.uploadFile(`tests/${filename}`, content, 'text/plain');
    const presignedUrl = await this.storageService.getPresignedDownloadUrl(`tests/${filename}`);

    return {
      success: true,
      key: `tests/${filename}`,
      presignedUrl,
      message: 'File successfully uploaded to Neon Object Storage',
    };
  }

  @Get('download-url/:key(*)')
  async getDownloadUrl(@Param('key') key: string) {
    const url = await this.storageService.getPresignedDownloadUrl(key);
    return { key, url };
  }
}
