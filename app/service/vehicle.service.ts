import { AxiosPromise } from 'axios';
import urlsConfig from '../configs/url.config';
import { axiosInstance } from '../utils/axios.util';
import { VehicleType } from '../types/vehicle.type';
import { CreateVehicleFormDataType, LookupQueryDataType, LookupResponseType } from './types/vehicle-service.type';
import { routeHelper } from '../src/helpers';

export const createVehicle = (data: CreateVehicleFormDataType): AxiosPromise<VehicleType> => {
  return axiosInstance.post(urlsConfig.vehicle.create, data);
};

export const lookup = (data: LookupQueryDataType): AxiosPromise<LookupResponseType> => {
  const query: any = {};
  if (data.relations) {
    query.relations = data.relations.join(',');
  }
  console.log(query);
  return axiosInstance.get(routeHelper.addQueryPArameters(urlsConfig.vehicle.get, query));
};