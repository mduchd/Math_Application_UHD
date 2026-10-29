import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class GuestLoginDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  avatarMascot?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  gradeLevel?: number;
}
