import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class VehicleInfoUpdateDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsOptional()
  @IsNumber()
  seatCount?: number;

  @IsOptional()
  @IsString()
  seatingPlan?: string;

  @IsOptional()
  @IsBoolean()
  isWifi?: boolean;

  @IsOptional()
  @IsBoolean()
  isJack?: boolean;

  @IsOptional()
  @IsBoolean()
  isTV?: boolean;
}
export class VehiclePointsUpdateDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(5)
  @Min(0)
  speedPoint: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(5)
  @Min(0)
  servicePoint: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(5)
  @Min(0)
  comfortPoint: number;
}
