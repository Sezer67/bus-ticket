import {
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { Cities } from 'src/shared/enums/service.enum';

export class ServiceCreateDto {
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  arrivalTime: string;

  @IsNotEmpty()
  @IsDateString()
  departureDate: Date;

  @IsNotEmpty()
  @IsEnum(Cities)
  departureCity: Cities;

  @IsNotEmpty()
  @IsEnum(Cities)
  arrivalCity: Cities;

  @IsNotEmpty()
  @IsString()
  route: string;

  @IsNotEmpty()
  @IsUUID()
  vehicleId: string;
}
