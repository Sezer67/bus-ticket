import { AxiosPromise } from "axios";
import urlsConfig from "../configs/url.config"
import { axiosInstance } from "../utils/axios.util"
import { TicketBuyResponse } from "./types/payment-service";

export const ticketBuy = (data: {price: number}):AxiosPromise<TicketBuyResponse> => {
    return axiosInstance.post(urlsConfig.payment.ticketBuy,data);
}