import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class VehicleLookupDto {
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @IsArray()
  relations?: string[];
}
