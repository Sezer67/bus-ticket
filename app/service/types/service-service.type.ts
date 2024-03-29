import { vehicleEnums } from '../../enums';
import { CompanyType } from '../../types/company.type';
import { BaseServiceType, ServiceType } from '../../types/service.type';
import { VehicleType } from '../../types/vehicle.type';

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
  rows: ServiceLookupResponseRowType[];
  count: number;
};
type RelationsType = 'company' | 'vehicle' | 'services';

type ServiceLookupResponseRowType = ServiceType & {
  baseService: {
    route: string;
    vehicle: Pick<VehicleType, 'id' | 'plate' | 'seatingPlan'>;
    company: Pick<CompanyType, 'id' | 'name'>;
  };
};

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
export enum Sort {
  LOWEST_PRICE = 0,
  HIGHEST_PRICE = 1,
  SHORTEST_TIME = 2,
  LONGEST_TIME = 3,
}
export type FindTicketQueryDataType = {
  relations?: RelationsType[];
  select?: (keyof BaseServiceType)[];
  filter?: {
    companyIds?: string[];
    seatingPlans?: string[];
  };
  limit?: number;
  offset?: number;
  vehicleType: vehicleEnums.VehicleType;
  from: string;
  to: string;
  date: Date;
  orderIndex?: number;
};

export type BuyTicketDataType = {
  id: string;
  passengerInfoList: {
    fullName: string;
    mail: string;
    seatNumber: number;
  }[];
};

export type BuyTicketResponseDataType = {
  fullName: string;
  mail: string;
  seatNumber: number;
  userId: string;
  serviceId: string;
  id: string;
  isToVote: boolean;
};

export type MyTavelsLookupDataType = {
  limit?: number;
  offset?: number;
};

export type MyTavelsResponseDataType = {
  rows: MyTravelsDataType[];
  count: number;
};

export type MyTravelsDataType = {
  id: string;
  seatNumber: number;
  isToVote: boolean;
  fullName: string;
  companyName: string;
  service: Pick<ServiceType, 'id' | 'arrivalCity' | 'arrivalDate' | 'departureCity' | 'departureDate' | 'price' > & {
    baseService: {
     id: string;
     isCompleted: boolean;
     vehicle: {
      id: string;
      vehicleType: vehicleEnums.VehicleType;
     }
    }
  };
}