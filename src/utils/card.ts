export interface Attributes {
  name: string;
  attributeName: string;
  attribute_main?: string;
  value_main?: string;
  attribute_secondary?: string;
  value_secondary?: string;
  attribute_tertiary?: string;
  value_tertiary?: string;
  quantity?: number;
  [key: string]: any;
}

export interface CartItem {
  price: number;
  quantity: number;
  attributes?: Attributes[];
  slug: string;
}

export const addProductToCart = (
  slug: string,
  price: number,
  quantity: number = 1,
  attributes?: Attributes[]
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
        (a) =>
          a.name === attr.name &&
          a.attributeName === attr.attributeName
      )
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
  a?: Attributes[],
  b?: Attributes[]
): boolean => {
  if (!a && !b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;

  const sortedA = [...a].sort((x, y) => x.name.localeCompare(y.name));
  const sortedB = [...b].sort((x, y) => x.name.localeCompare(y.name));

  return sortedA.every((attr, index) => {
    const bAttr = sortedB[index];
    return (
      attr.name === bAttr.name &&
      attr.attributeName === bAttr.attributeName 
    );
  });
};

export const updateCartItemQuantity = (
  slug: string,
  newQuantity: number,
  attributes?: Attributes[]
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

export const removeCartItem = (
  slug: string,
  attributes?: Attributes[]
) => {
  const storedCart = localStorage.getItem("cart");
  const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

  const updatedCart = cart.filter(
    (item) =>
      !(item.slug === slug && areAttributesEqual(item.attributes, attributes))
  );

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  window.dispatchEvent(new Event("cartUpdated"));
};
