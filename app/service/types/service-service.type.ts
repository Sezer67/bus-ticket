import { vehicleEnums } from '../../enums';
import { BaseServiceType, ServiceType } from '../../types/service.type';

export type CreateBaseServiceFormDataType = {
  vehicleId: string;
  route: string;
};

export type CreateBaseServiceResponseType = {
  id: string;
  route: string;
  vehicleId: string;
  companyId: string;
};

export type BaseServiceLookupResponseType = {
  rows: BaseServiceType[];
  count: number;
};
export type ServiceLookupResponseType = {
  rows: ServiceType[];
  count: number;
};
type RelationsType = 'company' | 'vehicle' | 'services';

export type LookupQueryDataType = {
  relations?: RelationsType[];
  select?: (keyof BaseServiceType)[];
  limit?: number;
  offset?: number;
};

export type CreateMultipleServiceType = {
  datas: {
    price: string;
    arrivalDate: Date;
    departureDate: Date;
    departureCity: string;
    arrivalCity: string;
  }[];
  baseServiceId: string;
};

export type FindTicketQueryDataType = {
  relations?: RelationsType[];
  select?: (keyof BaseServiceType)[];
  limit?: number;
  offset?: number;
  vehicleType: vehicleEnums.VehicleType;
  from: string;
  to: string;
  date: Date;
};
