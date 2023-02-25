import { vehicleEnums } from '../../enums';
import { BusSeatPlanType, PlaneSeatPlanType } from '../../types/vehicle.type';

export type CreateVehicleFormDataType = {
  seatCount: number;
  plate: string;
  seatingPlan: BusSeatPlanType | PlaneSeatPlanType;
  isWifi?: boolean;
  isJack?: boolean;
  isTV?: boolean;
  vehicleType: vehicleEnums.VehicleType;
};
