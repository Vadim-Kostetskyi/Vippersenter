type ShippingPrice = {
  amountWithVAT: string;
  amountWithoutVAT: string;
  vat: string;
};

type AnyObject = { [key: string]: any };

export const postenDeliveryPrice = (obj: AnyObject): ShippingPrice[] => {
  let result: ShippingPrice[] = [];

  if (Array.isArray(obj)) {
    for (const item of obj) {
      result = result.concat(postenDeliveryPrice(item));
    }
  } else if (obj && typeof obj === "object") {
    // якщо знайдено потрібні поля — додаємо об’єкт у результат
    if ("amountWithVAT" in obj && "amountWithoutVAT" in obj && "vat" in obj) {
      result.push({
        amountWithVAT: obj.amountWithVAT,
        amountWithoutVAT: obj.amountWithoutVAT,
        vat: obj.vat,
      });
    } else {
      // інакше рекурсивно перевіряємо всі властивості
      for (const key in obj) {
        result = result.concat(postenDeliveryPrice(obj[key]));
      }
    }
  }

  return result;
};
