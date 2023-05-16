type FormatType = 'Day Month Date Year HH:mm' | 'Day Month Date' | 'Day Month Date HH:mm' | 'DD/MM/YYYY HH:mm' | 'DD/MM' | 'DD/MM HH:mm' | 'HH:mm';

const dakika = 60;
const saat = dakika * 60;
const gun = saat * 24;
const ay = gun * 30;
const yil = ay * 12 + 60 * 60 * 6;

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
    case 'Day Month Date':
      const splitted = date.toDateString().split(" ").filter((v,i) => i < 3);
      result = splitted.join(" ");
      break;
    case 'DD/MM/YYYY HH:mm':
      result = [isSingleDigit(date.getDate()), isSingleDigit(date.getMonth() + 1), date.getFullYear()].join('/');
      break;
    case 'DD/MM':
      result = [isSingleDigit(date.getDate()), isSingleDigit(date.getMonth() + 1)].join('/');
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

export const hourDifference = (littleDate: Date, bigDate: Date): string => {
  const diff = (bigDate.getTime() - littleDate.getTime()) / 1000;

  const hourDiff = Math.floor((diff % gun) / saat);
  const minDiff = Math.floor((diff % saat) / dakika);

  let result = hourDiff + ' hours ';

  if (minDiff > 0) {
    result += minDiff + ' minutes';
  }

  return result;
};
