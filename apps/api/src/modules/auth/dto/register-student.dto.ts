import { IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';

export class RegisterStudentDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên học sinh không được để trống' })
  fullName: string;

  @IsString()
  @Length(4, 6, { message: 'Mã PIN phải từ 4 đến 6 chữ số' })
  @Matches(/^[0-9]+$/, { message: 'Mã PIN chỉ bao gồm các chữ số' })
  pin: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  avatarMascot?: string;

  @IsOptional()
  gradeLevel?: number;
}
