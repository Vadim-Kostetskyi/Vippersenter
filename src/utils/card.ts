import { CartAttributes, CartItem } from "types/types";

export const addProductToCart = (
  slug: string,
  price: number,
  quantity: number = 1,
  attributes?: CartAttributes[],
) => {
  const storedCart = localStorage.getItem("cart");
  const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

  const existingItemIndex = cart.findIndex((item) => {
    if (item.slug !== slug) return false;
    if (!item.attributes && !attributes) return true;
    if (!item.attributes || !attributes) return false;
    if (item.attributes.length !== attributes.length) return false;

    return item.attributes.every((attr) =>
      attributes.some(
        (a) => a.parameter === attr.parameter && a.attribute === attr.attribute,
      ),
    );
  });

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({ slug, price, quantity, attributes });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCartItems = (): CartItem[] => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const areAttributesEqual = (
  a?: CartAttributes[],
  b?: CartAttributes[],
): boolean => {
  if (!a && !b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;

  const sortedA = [...a].sort((x, y) => x.parameter.localeCompare(y.parameter));
  const sortedB = [...b].sort((x, y) => x.parameter.localeCompare(y.parameter));

  return sortedA.every((attr, index) => {
    const bAttr = sortedB[index];
    return (
      attr.parameter === bAttr.parameter && attr.attribute === bAttr.attribute
    );
  });
};

export const updateCartItemQuantity = (
  slug: string,
  newQuantity: number,
  attributes?: CartAttributes[],
) => {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

  const updatedCart = cart.map((item) => {
    const sameProduct = item.slug === slug;
    const sameAttributes = areAttributesEqual(item.attributes, attributes);

    return sameProduct && sameAttributes
      ? { ...item, quantity: newQuantity }
      : item;
  });

  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

export const updateCartItemPrice = (
  slug: string,
  newPrice: number,
  attributes?: CartAttributes[],
) => {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

  const updatedCart = cart.map((item) => {
    const sameProduct = item.slug === slug;
    const sameAttributes = areAttributesEqual(item.attributes, attributes);

    return sameProduct && sameAttributes ? { ...item, price: newPrice } : item;
  });

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  window.dispatchEvent(new Event("cartUpdated"));
};

export const removeCartItem = (slug: string, attributes?: CartAttributes[]) => {
  const storedCart = localStorage.getItem("cart");
  const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

  const updatedCart = cart.filter(
    (item) =>
      !(item.slug === slug && areAttributesEqual(item.attributes, attributes)),
  );

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  window.dispatchEvent(new Event("cartUpdated"));
};

export const clearCart = () => {
  localStorage.removeItem("cart");
  window.dispatchEvent(new Event("cartUpdated"));
};
