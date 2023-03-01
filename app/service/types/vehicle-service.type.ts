import { vehicleEnums } from '../../enums';
import { BusSeatPlanType, PlaneSeatPlanType, TrainSeatPlanType } from '../../types/vehicle.type';

export type CreateVehicleFormDataType = {
  seatCount: number;
  plate: string;
  seatingPlan: BusSeatPlanType | PlaneSeatPlanType | TrainSeatPlanType;
  isWifi?: boolean;
  isJack?: boolean;
  isTV?: boolean;
  vehicleType: vehicleEnums.VehicleType;
};
