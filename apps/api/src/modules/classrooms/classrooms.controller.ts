import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { ClassRealtimeGateway } from '../socket/class-realtime.gateway';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('classrooms')
export class ClassroomsController {
  constructor(
    private readonly classroomsService: ClassroomsService,
    private readonly socketGateway: ClassRealtimeGateway,
  ) {}

  @Roles('TEACHER')
  @Post()
  async createClass(
    @CurrentUser('id') teacherId: string,
    @Body() body: { name: string; gradeLevel?: number },
  ) {
    return this.classroomsService.createClass(teacherId, body.name, body.gradeLevel || 3);
  }

  @Roles('TEACHER')
  @Get('teacher/my-classes')
  async getMyClasses(@CurrentUser('id') teacherId: string) {
    return this.classroomsService.getTeacherClasses(teacherId);
  }

  @Roles('TEACHER')
  @Get('teacher/analytics')
  async getTeacherAnalytics(@CurrentUser('id') teacherId: string) {
    return this.classroomsService.getTeacherAnalytics(teacherId);
  }

  @Roles('TEACHER')
  @Post('teacher/seed-demo')
  async seedDemoClass(@CurrentUser('id') teacherId: string) {
    return this.classroomsService.seedDemoClass(teacherId);
  }

  @Roles('TEACHER')
  @Get('teacher/:teacherId')
  async getTeacherClasses(@Param('teacherId') teacherId: string) {
    return this.classroomsService.getTeacherClasses(teacherId);
  }

  @Roles('TEACHER')
  @Get(':id/members')
  async getClassMembers(
    @Param('id') classroomId: string,
    @CurrentUser('id') teacherId: string,
  ) {
    return this.classroomsService.getClassMembers(classroomId, teacherId);
  }

  @Roles('STUDENT')
  @Post('join')
  async joinClass(
    @CurrentUser('id') studentId: string,
    @Body('joinCode') joinCode: string,
  ) {
    const member = await this.classroomsService.joinClassByCode(studentId, joinCode);

    // Gửi thông báo realtime cho Giáo viên
    this.socketGateway.notifyTeacherStudentJoined(member.classroomId, member);

    return member;
  }

  @Roles('STUDENT')
  @Get('student/my-classes')
  async getMyStudentClasses(@CurrentUser('id') studentId: string) {
    return this.classroomsService.getStudentClasses(studentId);
  }

  @Roles('TEACHER')
  @Patch('members/:id/review')
  async reviewMember(
    @CurrentUser('id') teacherId: string,
    @Param('id') memberId: string,
    @Body('action') action: 'APPROVE' | 'REJECT',
  ) {
    const updated = await this.classroomsService.reviewMember(teacherId, memberId, action);

    // Gửi thông báo realtime cho Học sinh kết quả duyệt
    this.socketGateway.notifyStudentApprovalResult(updated.studentId, updated.status);

    return updated;
  }
}
