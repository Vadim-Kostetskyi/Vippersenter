export interface CartItem {
  id: string;
  price: number;
  quantity: number;
}

export const addProductToCart = (
  id: string,
  price: number,
  quantity: number = 1
) => {
  const storedCart = localStorage.getItem("cart");
  const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ id, price, quantity });
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
