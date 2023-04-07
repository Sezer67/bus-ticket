import { AxiosPromise } from "axios";
import urlsConfig from "../configs/url.config"
import { axiosInstance } from "../utils/axios.util"
import { CompanyType } from "../types/company.type";

export const createCompany = (data: {name:string} ):AxiosPromise<CompanyType> => {
    return axiosInstance.post(urlsConfig.company.create,data);
}