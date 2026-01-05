export const formatPrice = (
  price: number | string
): {
  value: string;
  showCurrency: boolean;
} => {
  if (typeof price === "number") {
    return {
      value: price.toFixed(2),
      showCurrency: true,
    };
  }

  const parsed = Number(price);

  if (!isNaN(parsed)) {
    return {
      value: parsed.toFixed(2),
      showCurrency: true,
    };
  }

  return {
    value: price,
    showCurrency: false,
  };
};
