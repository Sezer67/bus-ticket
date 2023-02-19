import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
    }

    return Promise.reject(error);
  },
);

const setToken = (token: String) => {
  (axiosInstance.defaults.headers.common as any).token = token;
};

export { axiosInstance, setToken };
