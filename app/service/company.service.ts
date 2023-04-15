import { AxiosPromise } from 'axios';
import urlsConfig from '../configs/url.config';
import { axiosInstance } from '../utils/axios.util';
import { CompanyType } from '../types/company.type';
import { companyServiceType } from './types';
import { routeHelper } from '../src/helpers';

export const createCompany = (data: { name: string }): AxiosPromise<CompanyType> => {
  return axiosInstance.post(urlsConfig.company.create, data);
};

export const getCompanyList = (
  data: companyServiceType.LookupQueryDataType,
): AxiosPromise<{ rows: CompanyType[]; count: number }> => {
  const query: any = {};

  if (data.ids) {
    query.ids = data.ids.join(',');
  }

  if (data.limit) {
    query.limit = data.limit;
  }

  if (data.offset) {
    query.offset = data.offset;
  }

  return axiosInstance.get(routeHelper.addQueryPArameters(urlsConfig.company.get, query));
};
