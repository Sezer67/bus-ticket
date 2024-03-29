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
  select?: (keyof VehicleType)[];
  limit?: number;
  offset?: number;
  ids?: string[];
  plates?: string[];
};

export type LookupResponseType = {
  rows: VehicleType[];
  count: number;
};

export type VoteVehicleDataType = {
  id: string;
  servicePoint: number;
  comfortPoint: number;
  speedPoint: number;
}