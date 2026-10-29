import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterTeacherDto } from './dto/register-teacher.dto';
import { LoginTeacherDto } from './dto/login-teacher.dto';
import { RegisterStudentDto } from './dto/register-student.dto';
import { LoginStudentDto } from './dto/login-student.dto';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { GuestLoginDto } from './dto/guest-login.dto';
import { UpgradeGuestDto } from './dto/upgrade-guest.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('google')
  async googleAuth(@Body() dto: GoogleAuthDto) {
    return this.authService.googleAuth(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('guest')
  async guestLogin(@Body() dto: GuestLoginDto) {
    return this.authService.loginAsGuest(dto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('upgrade-guest')
  async upgradeGuest(
    @CurrentUser('id') userId: string,
    @Body() dto: UpgradeGuestDto,
  ) {
    return this.authService.upgradeGuest(userId, dto);
  }

  @Post('register/teacher')
  async registerTeacher(@Body() dto: RegisterTeacherDto) {
    return this.authService.registerTeacher(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login/teacher')
  async loginTeacher(@Body() dto: LoginTeacherDto) {
    return this.authService.loginTeacher(dto);
  }

  @Post('register/student')
  async registerStudent(@Body() dto: RegisterStudentDto) {
    return this.authService.registerStudent(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login/student')
  async loginStudent(@Body() dto: LoginStudentDto) {
    return this.authService.loginStudent(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@CurrentUser('id') userId: string) {
    return this.authService.getMe(userId);
  }
}
