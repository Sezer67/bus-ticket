import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  MaxLength,
  IsEnum,
  IsEmail,
  Matches,
  IsDate,
  IsDateString,
} from 'class-validator';
import { userEnum } from 'src/shared/enums';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  @MaxLength(11)
  identityNumber?: string;

  @IsNotEmpty()
  @IsEnum(userEnum.Gender)
  gender: userEnum.Gender;

  @IsOptional()
  @IsEnum(userEnum.Role)
  role: userEnum.Role;

  @IsNotEmpty()
  @IsEmail()
  mail: string;

  @IsOptional()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  @IsDate()
  birthday: Date;

  @IsNotEmpty()
  @IsString()
  @Matches('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$')
  password: string;
}
