import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { reduxSliceTypes } from '../../../types/index';
import { VehicleType } from '../../../types/vehicle.type';
import { SetListActionType } from './reducer.type';

const initialState: reduxSliceTypes.VehicleSliceType = {
  vehicle: undefined,
  vehicleList: [],
  vehiclesCount: 0,
};

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    setSelectedVehicle: (state, action: PayloadAction<VehicleType>) => {
      state.vehicle = { ...action.payload };
    },
    setVehicleList: (state, action: PayloadAction<VehicleType[]>) => {
      state.vehicleList = [...action.payload];
    },
    setVehicleLength: (state, action: PayloadAction<number>) => {
      state.vehiclesCount = action.payload;
    },
    updateVehicle: (state, action: PayloadAction<VehicleType>) => {
      state.vehicleList = state.vehicleList.map((v) => {
        if (v.id === action.payload.id) return action.payload;
        return v;
      });
    },
    addVehicleToList: (state, action: PayloadAction<VehicleType>) => {
      state.vehicleList = [...state.vehicleList, { ...action.payload }];
      state.vehiclesCount = state.vehiclesCount + 1;
    },
    removeVehicleToList: (state, action: PayloadAction<{ id: string }>) => {
      state.vehicleList = state.vehicleList.filter((v) => v.id !== action.payload.id);
      state.vehiclesCount = state.vehiclesCount - 1;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.vehiclesCount = action.payload;
    },
  },
});

export const vehicleActions = vehicleSlice.actions;
export default vehicleSlice.reducer;
