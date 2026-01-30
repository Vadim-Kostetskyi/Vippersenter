import { useEffect } from "react";
import { getCartItems } from "utils/card";
import { useSyncCartProductsMutation } from "storeRedux/productsApi";
import { CartItem } from "types/types";

const CartSync = () => {
  const [syncCartProducts] = useSyncCartProductsMutation();

  useEffect(() => {
    console.log(111);

    if (sessionStorage.getItem("cart_synced")) return;

    const cart: CartItem[] = getCartItems();
    if (!cart.length) {
      sessionStorage.setItem("cart_synced", "1");
      return;
    }

    syncCartProducts({
      items: cart.map((item) => ({
        slug: item.slug,
        attributes: item.attributes,
      })),
    })
      .unwrap()
      .then((res) => {
        const updatedCart = cart.map((item) => {
          const fresh = res.find((p) => p.slug === item.slug);
          if (!fresh) return item;

          return {
            ...item,
            price: fresh.price,
            availableQuantity: fresh.stock,
            hasChanged:
              item.price !== fresh.price || fresh.stock < item.quantity,
          };
        });
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated"));
      })
      .catch(() => {
        sessionStorage.setItem("cart_synced", "1");
      });
  }, []);

  return null;
};

export default CartSync;
