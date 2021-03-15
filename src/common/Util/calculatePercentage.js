export const calculatePercentage = (denominator, numerator) => {
  const percentage = (numerator / denominator) * 100;

  return +percentage.toFixed(1);
};
