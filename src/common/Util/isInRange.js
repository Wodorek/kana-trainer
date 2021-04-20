export const isInRange = (x, min, max) => {
  const charcode = x[0].charCodeAt(0);
  return charcode >= min && charcode <= max;
};
