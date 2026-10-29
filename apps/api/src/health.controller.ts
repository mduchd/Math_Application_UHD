import { Controller, Get } from '@nestjs/common';
import { prisma } from './database/prisma';
import { StorageService } from './modules/storage/storage.service';

@Controller('health')
export class HealthController {
  constructor(private readonly storageService: StorageService) {}

  @Get()
  async getHealth() {
    let dbStatus = 'ok';
    let dbError: string | null = null;
    let dbTime = 0;

    try {
      const start = Date.now();
      await prisma.$queryRaw`SELECT 1`;
      dbTime = Date.now() - start;
    } catch (err: any) {
      dbStatus = 'error';
      dbError = err?.message || 'Database query failed';
    }

    const storageTest = await this.storageService.testConnection();

    return {
      status: dbStatus === 'ok' && storageTest.success ? 'ok' : 'degraded',
      services: {
        neonPostgres: {
          status: dbStatus,
          responseTimeMs: dbTime,
          error: dbError,
        },
        neonObjectStorage: {
          status: storageTest.success ? 'ok' : 'error',
          bucket: 'assets',
          details: storageTest.message,
        },
      },
      timestamp: new Date().toISOString(),
    };
  }
}
