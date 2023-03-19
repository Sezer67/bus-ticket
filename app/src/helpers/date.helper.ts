type FormatType = 'Day Month Date Year HH:mm' | 'DD/MM/YYYY HH:mm' | 'DD/MM HH:mm';

const isSingleDigit = (number: number) => {
  if (number < 10) {
    return '0' + number;
  }
  return number;
};

export const formattedDate = (date: Date, format: FormatType): string => {
  let result = '';
  switch (format) {
    case 'Day Month Date Year HH:mm':
      result = date.toDateString();
      break;
    case 'DD/MM/YYYY HH:mm':
      result = [isSingleDigit(date.getDate()), isSingleDigit(date.getMonth() + 1), date.getFullYear()].join('/');
      break;

    case 'DD/MM HH:mm':
      result = [isSingleDigit(date.getDate()), isSingleDigit(date.getMonth() + 1)].join('/');
      break;
  }

  if (format.includes('HH:mm')) {
    result += ' ' + [isSingleDigit(date.getHours()), isSingleDigit(date.getMinutes())].join(':');
  }

  return result;
};
