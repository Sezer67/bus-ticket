import { ServiceType } from '../../../types/service.type';
import { VehicleType } from '../../../types/vehicle.type';

export type AddBaseServiceActionType = {
  id: string;
  route: string;
  vehicleId: string;
  companyId: string;
  vehicle: Pick<VehicleType, 'id' | 'plate' | 'vehicleType'>;
};

export type CreateMultipleServiceType = {
  services: ServiceType[];
  baseServiceId: string;
};
