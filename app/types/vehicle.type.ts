import { vehicleEnums } from '../enums';

export type VehicleType = {
  id: string;
  vehicleType: vehicleEnums.VehicleType;
  seatCount: number;
  plate: string;
  seatingPlan: BusSeatPlanType | PlaneSeatPlanType;
  isWifi: boolean;
  isJack: boolean;
  isTV: boolean;
  comfortPoint: number;
  speedPoint: number;
  servicePoint: number;
  votesCount: number;
  companyId: string;
};

export type BusSeatPlanType = '2+1' | '2+2';
export type PlaneSeatPlanType = '3+3' | '4+3';
