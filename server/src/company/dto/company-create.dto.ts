import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CompanyCreateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;
}
