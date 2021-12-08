/**
 * Returns boolean - true - if a param is a number and is evenly devisible by 2. else returns false
 * @param {number} i
 * @return {boolean}
 */

export const isEven = (i) => {
  if (typeof i !== 'number') return undefined;

  return i % 2 === 0;
};
