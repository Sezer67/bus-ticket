import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { vehicleEnum } from 'src/shared/enums';

export class CreateBaseServiceDto {
  @IsNotEmpty()
  @IsUUID()
  vehicleId: string;

  @IsNotEmpty()
  @IsString()
  route: string;

  // @IsNotEmpty()
  // @IsEnum(vehicleEnum.VehicleType)
  // vehicleType: vehicleEnum.VehicleType;
}
