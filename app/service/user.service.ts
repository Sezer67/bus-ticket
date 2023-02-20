import { AxiosPromise } from 'axios';
import urlsConfig from '../configs/url.config';
import { axiosInstance } from '../utils/axios.util';
import { LoginFormDataType, LoginResponseType, RegisterFormDataType } from './types/user-service.type';

export const login = (data: LoginFormDataType): AxiosPromise<LoginResponseType> => {
  return axiosInstance.post(urlsConfig.user.login, data);
};

export const register = (data: RegisterFormDataType): AxiosPromise<LoginResponseType> => {
  return axiosInstance.post(urlsConfig.user.register, data);
};
