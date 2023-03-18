import { BaseServiceType } from '../../types/service.type';

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
