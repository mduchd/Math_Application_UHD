import { Module } from '@nestjs/common';
import { AssessmentModule } from './modules/assessment/assessment.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClassroomsModule } from './modules/classrooms/classrooms.module';
import { LibraryModule } from './modules/library/library.module';
import { SocketModule } from './modules/socket/socket.module';
import { StorageModule } from './modules/storage/storage.module';
import { UsersModule } from './modules/users/users.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    AuthModule,
    SocketModule,
    AssessmentModule,
    ClassroomsModule,
    LibraryModule,
    StorageModule,
    UsersModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
