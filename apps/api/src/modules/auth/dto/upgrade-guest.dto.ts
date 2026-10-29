import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class UpgradeGuestDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsNotEmpty({ message: 'Mã PIN bí mật là bắt buộc.' })
  @IsString()
  @Matches(/^[0-9]{4,6}$/, { message: 'Mã PIN phải gồm từ 4 đến 6 chữ số.' })
  pin: string;

  @IsOptional()
  @IsString()
  avatarMascot?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  gradeLevel?: number;
}
