export const buildDate = (str) => {
  const [day, month, dayNumber, year] = String(str).split(' ');

  return { day, month, dayNumber, year };
};
