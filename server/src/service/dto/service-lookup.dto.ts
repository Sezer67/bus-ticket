import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { vehicleEnum } from 'src/shared/enums';

export class ServiceLookupDto {
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @IsArray()
  relations?: string[];

  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @IsArray()
  select?: string[];

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

  @IsNotEmpty()
  @Type(() => Number)
  @Transform(({ value }) => +value)
  @IsEnum(vehicleEnum.VehicleType)
  vehicleType: vehicleEnum.VehicleType;

  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date: Date;

  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @IsArray()
  companyIds?: string[];

  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @IsArray()
  seatingPlans?: string[];
}
export class TravelLookupDto {
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