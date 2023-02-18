export const pointCalculate = (
  avaliablePoint: number,
  newPoint: number,
  votesCount: number,
): number => {
  return (avaliablePoint + newPoint) / votesCount;
};
