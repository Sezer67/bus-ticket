import axios, { AxiosError } from 'axios';
import urlsConfig from '../configs/url.config';
import { storageHelper } from '../src/helpers';
import { NavigationContext } from '@react-navigation/native';

const axiosInstance = axios.create({
  baseURL: urlsConfig.apiUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    console.log(error);
    if (error.response?.status === 401) {
      // setToken('');
      // storageHelper.setStorageKey('@token', '');
      console.log('401 ',error);
      
    }

    return Promise.reject(error);
  },
);

const setToken = (token: String) => {
  (axiosInstance.defaults.headers.common as any).token = token;
};

export { axiosInstance, setToken };
