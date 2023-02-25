import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { vehicleEnum } from 'src/shared/enums';

export class VehicleCreateDto {
  @IsNotEmpty()
  @IsNumber()
  seatCount: number;

  @IsNotEmpty()
  @IsString()
  plate: string;

  @IsNotEmpty()
  @IsString()
  seatingPlan: string;

  @IsOptional()
  @IsBoolean()
  isWifi: boolean;

  @IsOptional()
  @IsBoolean()
  isJack: boolean;

  @IsOptional()
  @IsBoolean()
  isTV: boolean;

  @IsNotEmpty()
  @IsEnum(vehicleEnum.VehicleType)
  vehicleType: vehicleEnum.VehicleType;
}
