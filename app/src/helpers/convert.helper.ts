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
