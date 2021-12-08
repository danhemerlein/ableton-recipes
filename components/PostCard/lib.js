import { remHelper } from 'lib/utilities/remHelper';
import { isEven } from 'lib/utilities/';

export const getDesktopMarginLeft = (i) => {
  const num = Number(i);
  if (num === 0 || num % 4 === 0) {
    return '0';
  }
  return remHelper[8];
};

const noMarginRightDekstop = [3, 7, 11, 15, 19];

export const getDestkopMarginRight = (i) => {
  const num = Number(i);
  if (noMarginRightDekstop.includes(num)) {
    return '0';
  }
  return remHelper[8];
};

export const getTabletMarginLeft = (i) => {
  const num = Number(i);
  if (num === 0 || isEven(num)) {
    return '0';
  }
  return remHelper[8];
};

export const getTabletMarginRight = (i) => {
  const num = Number(i);
  if (!isEven(i) && num !== 0) {
    return '0';
  }
  return remHelper[8];
};
