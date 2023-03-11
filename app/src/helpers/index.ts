import { BusSeatPlanType, PlaneSeatPlanType, TrainSeatPlanType } from '../../types/vehicle.type';

export * as storageHelper from './storage.helper';
export * as routeHelper from './route.helper';

export const getSeatPlanArray = (index: number) => {
  if (index === 0) {
    return ['2+1', '2+2'] as BusSeatPlanType[];
  } else if (index === 1) {
    return ['3+3', '4+3'] as PlaneSeatPlanType[];
  } else {
    return ['2+2', '3+2'] as TrainSeatPlanType[];
  }
};
