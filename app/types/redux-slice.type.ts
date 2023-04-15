import { vehicleEnums } from '../enums';
import { BaseServiceType, ServiceType } from './service.type';
import { UserType } from './user.type';
import { VehicleType } from './vehicle.type';

export type SettingsSliceType = {
  loading: {
    isLoading: boolean;
    content: string | undefined;
  };
  error: {
    isError: boolean;
    content: string | undefined;
  };
};

export type UserSliceType = {
  user: UserType;
  token?: string;
  isAuthenticated: boolean;
};

export type VehicleSliceType = {
  vehicle: VehicleType | undefined;
  vehicleList: VehicleType[];
  vehiclesCount: number;
};

export type ServiceSliceType = {
  service: ServiceType | undefined;
  baseServiceList: BaseServiceType[];
  baseServiceCount: number;
  serviceList: ServiceType[];
  ticketFindForm: {
    vehicleType: vehicleEnums.VehicleType;
    from: string;
    to: string;
    date: string;
  } | undefined;
};

export type ReduxRootType = {
  user: UserSliceType;
  settings: SettingsSliceType;
  vehicle: VehicleSliceType;
  service: ServiceSliceType;
};
