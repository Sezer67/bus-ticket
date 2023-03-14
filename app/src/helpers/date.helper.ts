type FormatType = 'Day Month Date Year HH:mm';

export const formattedDate = (date: Date, format: FormatType): string => {
  let result = '';
  switch (format) {
    case 'Day Month Date Year HH:mm':
      result = date.toDateString() + ' ' + [date.getHours(), date.getMinutes()].join(':');
      break;
  }
  return result;
};
