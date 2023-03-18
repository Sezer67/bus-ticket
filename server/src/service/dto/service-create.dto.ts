import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Cities } from 'src/shared/enums/service.enum';

export class ServiceCreateClass {
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @Type(() => Date)
  @Transform(({value}) => new Date(value))
  @IsDate()
  arrivalDate: Date;

  @IsNotEmpty()
  @Transform(({value}) => new Date(value))
  @IsDate()
  departureDate: Date;

  @IsNotEmpty()
  @IsString()
  departureCity: string;

  @IsNotEmpty()
  @IsString()
  arrivalCity: string;
}

export class ServiceCreateDto {
  @IsNotEmpty()
  @ValidateNested()
  datas: ServiceCreateClass[];

  @IsNotEmpty()
  @IsUUID()
  baseServiceId: string;
}
