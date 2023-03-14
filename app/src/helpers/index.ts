import { BusSeatPlanType, PlaneSeatPlanType, TrainSeatPlanType } from '../../types/vehicle.type';

export * as storageHelper from './storage.helper';
export * as routeHelper from './route.helper';
export * as convertHelper from './convert.helper';
export * as dateHelper from './date.helper';

export const getSeatPlanArray = (index: number) => {
  if (index === 0) {
    return ['2+1', '2+2'] as BusSeatPlanType[];
  } else if (index === 1) {
    return ['3+3', '4+3'] as PlaneSeatPlanType[];
  } else {
    return ['2+2', '3+2'] as TrainSeatPlanType[];
  }
};

export const arrayIndexChange = <T>(arr: T[], old_index: number, new_index: number): T[] => {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push();
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
};

