import { IsNotEmpty, IsString } from 'class-validator';

export class LoginStudentDto {
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập Tên đăng nhập hoặc Họ tên' })
  identifier: string;

  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập Mã PIN' })
  pin: string;
}
