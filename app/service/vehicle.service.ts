import { AxiosPromise } from 'axios';
import urlsConfig from '../configs/url.config';
import { axiosInstance } from '../utils/axios.util';
import { VehicleType } from '../types/vehicle.type';
import { CreateVehicleFormDataType } from './types/vehicle-service.type';

export const createVehicle = (data: CreateVehicleFormDataType): AxiosPromise<VehicleType> => {
  return axiosInstance.post(urlsConfig.vehicle.create, data);
};
