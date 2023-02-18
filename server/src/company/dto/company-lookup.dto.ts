import { Transform, Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CompanyLookupDto {
  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => value.split(','))
  @IsArray()
  @IsString({ each: true })
  ids?: string[];

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => +value)
  @IsNumber()
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => +value)
  @IsNumber()
  offset?: number;
}
