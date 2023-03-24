import { AxiosPromise } from 'axios';
import urlsConfig from '../configs/url.config';
import { axiosInstance } from '../utils/axios.util';
import { LoginFormDataType, LoginResponseType, RegisterFormDataType } from './types/user-service.type';
import { UserType } from '../types/user.type';
import { formTypes } from '../types/index';

export const currentUser = (): AxiosPromise<UserType> => {
  return axiosInstance.get(urlsConfig.user.getCurrent);
};

export const login = (data: LoginFormDataType): AxiosPromise<LoginResponseType> => {
  return axiosInstance.post(urlsConfig.user.login, data);
};

export const register = (data: RegisterFormDataType): AxiosPromise<LoginResponseType> => {
  return axiosInstance.post(urlsConfig.user.register, data);
};

export const changePassword = (data: formTypes.ChangePasswordType): AxiosPromise<void> => {
  return axiosInstance.put(urlsConfig.user.changePassword, data);
};
