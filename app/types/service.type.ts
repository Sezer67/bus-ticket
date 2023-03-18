import { VehicleType } from './vehicle.type';

export type BaseServiceType = {
  id: string;
  isCompleted: boolean;
  route: string;
  winnings: number;
  ticketsCount: number;
  vehicleId: string;
  companyId: string;
  vehicle: VehicleType;
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
};
