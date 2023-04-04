const getPriceInBuck = (price, currencySymbol) => `${currencySymbol}${parseFloat((price / 100).toFixed(2))}`;

export default getPriceInBuck;
