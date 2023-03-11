import { vehicleEnums } from '../../enums';
import { BusSeatPlanType, PlaneSeatPlanType, TrainSeatPlanType, VehicleType } from '../../types/vehicle.type';

export type CreateVehicleFormDataType = {
  seatCount: number;
  plate: string;
  seatingPlan: BusSeatPlanType | PlaneSeatPlanType | TrainSeatPlanType;
  isWifi?: boolean;
  isJack?: boolean;
  isTV?: boolean;
  vehicleType: vehicleEnums.VehicleType;
};

export type EditVehicleFormDataType = Omit<CreateVehicleFormDataType, 'plate' | 'vehicleType'> & {
  id: string;
};

type RelationsType = 'company' | 'vehicle' | 'user';

export type LookupQueryDataType = {
  relations?: RelationsType[];
};

export type LookupResponseType = {
  rows: VehicleType[];
  count: number;
};