import { VehicleType } from './vehicle.type';

export type BaseServiceType = {
  id: string;
  isCompleted: boolean;
  route: string;
  winnings: number;
  ticketsCount: number;
  vehicleId: string;
  companyId: string;
  vehicle: Pick<VehicleType, 'id' | 'plate' | 'vehicleType'>;
  services: ServiceType[];
};
export type ServiceType = {
  id: string;
  price: number;
  arrivalDate: Date;
  departureDate: Date;
  departureCity: string;
  arrivalCity: string;
  baseServiceId: string;
  route: string;
  companyName: string;
  plate: string;
  seat: string;
  filledSeats: string[];
};

export type ServiceScreenFilterOptionsType = {
  companies: {
    id: string;
    name: string;
    isSelected: boolean;
  }[];
  seatingPlans: {
    seatingPlan: string;
    isSelected: boolean;
  }[];
};
