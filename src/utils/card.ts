interface CartItem {
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

export const updateCartItemQuantity = (
  productId: string,
  newQuantity: number
) => {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

  const updatedCart = cart.map((item) =>
    item.id === productId ? { ...item, quantity: newQuantity } : item
  );

  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

export const removeCartItem = (productId: string) => {
  const storedCart = localStorage.getItem("cart");
  const cart = storedCart ? JSON.parse(storedCart) : [];

  const updatedCart = cart.filter((item: any) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};
