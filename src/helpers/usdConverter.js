// eslint-disable-next-line import/prefer-default-export
export const usdConverter = number => {
  const numberToUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  return numberToUSD.format(number);
};
