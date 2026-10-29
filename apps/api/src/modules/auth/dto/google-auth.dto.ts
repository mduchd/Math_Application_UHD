import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GoogleAuthDto {
  @IsString()
  @IsNotEmpty({ message: 'Token Google không được để trống' })
  credential: string; // Google ID token

  @IsOptional()
  @IsEnum(['STUDENT', 'TEACHER'], { message: 'Vai trò phải là STUDENT hoặc TEACHER' })
  role?: 'STUDENT' | 'TEACHER';

  @IsOptional()
  gradeLevel?: number;
}
