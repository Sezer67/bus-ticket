import { AxiosPromise } from 'axios';
import urlsConfig from '../configs/url.config';
import { axiosInstance } from '../utils/axios.util';
import { CreateBaseServiceFormDataType, CreateBaseServiceResponseType } from './types/service-service.type';

export const createBaseService = (data: CreateBaseServiceFormDataType): AxiosPromise<CreateBaseServiceResponseType> => {
  return axiosInstance.post(urlsConfig.service.baseCreate, data);
};
