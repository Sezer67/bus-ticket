export type PropsType = {
  isSelectable: boolean;
  seatPlan: string;
  seats: {
    number: number;
    isFilled: boolean;
  }[];
  selectedSeatNumbers?: number[];
  setSelectedSeatNumbers?: (array: number[]) => void;
};
