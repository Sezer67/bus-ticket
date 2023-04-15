import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { reduxSliceTypes } from '../../../types/index';
import { BaseServiceType, ServiceType } from '../../../types/service.type';
import { AddBaseServiceActionType, CreateMultipleServiceType, SetTicketFindFormType } from './reducer.type';

const initialState: reduxSliceTypes.ServiceSliceType = {
  baseServiceCount: 0,
  baseServiceList: [],
  service: undefined,
  serviceList: [],
  ticketFindForm: undefined,
};

const ServiceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setBaseServiceList: (state, action: PayloadAction<BaseServiceType[]>) => {
      state.baseServiceList = [...action.payload];
    },
    addBaseService: (state, action: PayloadAction<AddBaseServiceActionType>) => {
      state.baseServiceList.unshift({
        ...action.payload,
        isCompleted: false,
        winnings: 0,
        ticketsCount: 0,
        services: [],
      });
    },
    newBaseServiceCompleted: (state, action: PayloadAction<CreateMultipleServiceType>) => {
      state.baseServiceList = state.baseServiceList.map((each) => {
        if (each.id === action.payload.baseServiceId) {
          return {
            ...each,
            services: [...action.payload.services],
          };
        }
        return each;
      });
    },
    setBaseServiceCount: (state, action: PayloadAction<number>) => {
      state.baseServiceCount = action.payload;
    },
    setServiceList: (state, action: PayloadAction<ServiceType[]>) => {
      state.serviceList = [...action.payload];
    },
    setTicketFindForm: (state,action: PayloadAction<SetTicketFindFormType>) => {
      state.ticketFindForm = { ...action.payload };
    }
  },
});

export const serviceActions = ServiceSlice.actions;
export default ServiceSlice.reducer;
