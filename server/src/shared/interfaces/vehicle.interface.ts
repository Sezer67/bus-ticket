import { Vehicle } from 'src/vehicle/vehicle.entity';

export interface IVehicleLookupResponse {
  count: number;
  rows: Vehicle[];
}
