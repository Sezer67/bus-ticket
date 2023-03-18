import { AxiosPromise } from 'axios';
import urlsConfig from '../configs/url.config';
import { axiosInstance } from '../utils/axios.util';
import {
  BaseServiceLookupResponseType,
  CreateBaseServiceFormDataType,
  CreateBaseServiceResponseType,
  CreateMultipleServiceType,
  LookupQueryDataType,
} from './types/service-service.type';
import { ServiceType } from '../types/service.type';
import { routeHelper } from '../src/helpers';

export const createBaseService = (data: CreateBaseServiceFormDataType): AxiosPromise<CreateBaseServiceResponseType> => {
  return axiosInstance.post(urlsConfig.service.baseCreate, data);
};

export const createMultipleService = (data: CreateMultipleServiceType): AxiosPromise<ServiceType[]> => {
  return axiosInstance.post(urlsConfig.service.multipleCreate, data);
};

export const baseServiceLookup = (data: LookupQueryDataType): AxiosPromise<BaseServiceLookupResponseType> => {
  const query: any = {};
  if (data.relations) {
    query.relations = data.relations.join(',');
  }
  if (data.select) {
    query.select = data.select.join(',');
  }
  if (data.limit) {
    query.limit = data.limit.toString();
  }
  if (data.offset) {
    query.offset = data.offset.toString();
  }
  return axiosInstance.get(routeHelper.addQueryPArameters(urlsConfig.service.baseServiceLookupMe, query));
};