import { AxiosPromise } from 'axios';
import urlsConfig from '../configs/url.config';
import { axiosInstance } from '../utils/axios.util';
import {
  BaseServiceLookupResponseType,
  CreateBaseServiceFormDataType,
  CreateBaseServiceResponseType,
  CreateMultipleServiceType,
  FindTicketQueryDataType,
  LookupQueryDataType,
  ServiceLookupResponseType,
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

export const findTickets = (data: FindTicketQueryDataType): AxiosPromise<ServiceLookupResponseType> => {
  const query: any = {};
  query.from = data.from;
  query.to = data.to;
  query.vehicleType = data.vehicleType.toString();
  query.date = data.date;

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
  if(data.filter){
    if(data.filter.companyIds){
      query.companyIds = data.filter.companyIds.join(",");
    }
    if(data.filter.seatingPlans){
      query.seatingPlans = data.filter.seatingPlans.join(",");
    }
  }
  return axiosInstance.get(routeHelper.addQueryPArameters(urlsConfig.service.findTicket, query));
};