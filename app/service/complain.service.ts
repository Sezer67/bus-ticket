import { AxiosPromise } from 'axios';
import urlsConfig from '../configs/url.config';
import { axiosInstance } from '../utils/axios.util';
import { complainServiceType } from './types';
import { userEnums } from '../enums';
import { ComplainType } from '../types/index';

export const create = (data: complainServiceType.CreateComplainFormDataType) => {
  return axiosInstance.post(urlsConfig.complain.create, data);
};

export const getNotReadCount = (): AxiosPromise<{ count: number }> => {
  return axiosInstance.get(urlsConfig.complain.notReadCount);
};

export const changeToRead = (id: string,role: userEnums.Role): AxiosPromise<ComplainType> => {
  let isCompany: boolean = false;
  if (role === userEnums.Role.Company) {
    isCompany = true;
  }
  return axiosInstance.post(urlsConfig.complain.changeToRead, { id, isCompany });
};

export const createAnswer = (data: complainServiceType.CreateAnswerDataType): AxiosPromise<ComplainType> => {
  return axiosInstance.post(urlsConfig.complain.createAnswer, data);
};

export const getMyComplains = (): AxiosPromise<ComplainType[]> => {
  return axiosInstance.get(urlsConfig.complain.getMyComplains);
};
