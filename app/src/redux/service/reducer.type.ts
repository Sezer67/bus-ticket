import { vehicleEnums } from '../../../enums';
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

export type SetTicketFindFormType = {
  vehicleType: vehicleEnums.VehicleType;
  from: string;
  to: string;
  date: string;
}
