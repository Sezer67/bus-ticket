import { ServiceLookupResponseType } from '../../service/types/service-service.type';
import { ServiceType } from '../../types/service.type';

export const convertRouteToSteps = (
  route: string,
): {
  departureCity: string;
  arrivalCity: string;
}[] => {
  const routeArr = route.split(',');
  const result: {
    departureCity: string;
    arrivalCity: string;
  }[] = [];

  let index = 0;

  while (index + 1 < routeArr.length) {
    const departureCity = routeArr[index];
    for (let i = index + 1; i < routeArr.length; i++) {
      result.push({
        departureCity,
        arrivalCity: routeArr[i],
      });
    }
    index++;
  }
  return result;
};

export const convertTicketResultToRedux = (response: ServiceLookupResponseType): {
  rows: ServiceType[],
  count: number
} => {

   const rows: ServiceType[] = response.rows.map((row) => {
    return {
      id: row.id,
      price: row.price,
      arrivalDate: row.arrivalDate,
      arrivalCity: row.arrivalCity,
      departureDate: row.departureDate,
      departureCity: row.departureCity,
      baseServiceId: row.baseServiceId,
      companyName: row.baseService.company.name,
      filledSeats: row.filledSeats,
      plate: row.baseService.vehicle.plate,
      route: row.baseService.route,
      seat: row.baseService.vehicle.seatingPlan
    }
  })
  
  return {
    rows,
    count: response.count
  }
};
