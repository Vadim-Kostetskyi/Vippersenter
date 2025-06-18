export interface CartItem {
  id: string;
  price: number;
  quantity: number;
  attributes?: { name: string; value: string }[];
}

export const addProductToCart = (
  id: string,
  price: number,
  quantity: number = 1,
  attributes?: { name: string; value: string }[]
) => {
  const storedCart = localStorage.getItem("cart");
  const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

  const existingItemIndex = cart.findIndex((item) => {
    if (item.id !== id) return false;
    if (!item.attributes && !attributes) return true;
    if (!item.attributes || !attributes) return false;
    if (item.attributes.length !== attributes.length) return false;

    return item.attributes.every((attr) =>
      attributes.some((a) => a.name === attr.name && a.value === attr.value)
    );
  });

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({ id, price, quantity, attributes });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCartItems = (): CartItem[] => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const areAttributesEqual = (
  a?: { name: string; value: string }[],
  b?: { name: string; value: string }[]
): boolean => {
  if (!a && !b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;

  const sortedA = [...a].sort((x, y) => x.name.localeCompare(y.name));
  const sortedB = [...b].sort((x, y) => x.name.localeCompare(y.name));

  return sortedA.every((attr, index) => {
    return (
      attr.name === sortedB[index].name && attr.value === sortedB[index].value
    );
  });
};

export const updateCartItemQuantity = (
  productId: string,
  newQuantity: number,
  attributes?: { name: string; value: string }[]
) => {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

  const updatedCart = cart.map((item) => {
    const sameProduct = item.id === productId;
    const sameAttributes = areAttributesEqual(item.attributes, attributes);

    return sameProduct && sameAttributes
      ? { ...item, quantity: newQuantity }
      : item;
  });

  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

export const removeCartItem = (
  productId: string,
  attributes?: { name: string; value: string }[]
) => {
  const storedCart = localStorage.getItem("cart");
  const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

  const updatedCart = cart.filter(
    (item) =>
      !(
        item.id === productId && areAttributesEqual(item.attributes, attributes)
      )
  );

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  window.dispatchEvent(new Event("cartUpdated"));
};
