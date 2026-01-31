// import { useEffect } from "react";
// import { getCartItems } from "utils/card";
// import { useSyncCartProductsMutation } from "storeRedux/productsApi";
// import { CartItem } from "types/types";
// import { SelectedAttributes } from "storeRedux/types";

// const CartSync = () => {
//   const [syncCartProducts] = useSyncCartProductsMutation();

//   useEffect(() => {
//     // if (sessionStorage.getItem("cart_synced")) return;

//     const cart: CartItem[] = getCartItems();
//     if (!cart.length) {
//       sessionStorage.setItem("cart_synced", "1");
//       return;
//     }

//     const areAttributesEqual = (
//       a: SelectedAttributes[],
//       b: SelectedAttributes[],
//     ): boolean => {
//       if (a.length !== b.length) return false;
//       return a.every((attrA) =>
//         b.some(
//           (attrB) =>
//             attrA.parameter === attrB.parameter &&
//             attrA.attribute === attrB.attribute,
//         ),
//       );
//     };
//     console.log(123);

//     syncCartProducts({
//       items: cart.map((item) => ({
//         slug: item.slug,
//         attributes: item.attributes,
//       })),
//     })
//       .unwrap()
//       .then((res) => {
//         // Перетворюємо attributes у масив {parameter, attribute}
//         const newData = res.map((item) => ({
//           ...item,
//           attributes: Object.entries(item.attributes).map(
//             ([parameter, attribute]) => ({
//               parameter,
//               attribute,
//             }),
//           ),
//         }));

//         // Оновлюємо корзину
//         const updatedCart = cart.map((item) => {
//           const freshItem = newData.find(
//             (p) =>
//               p.slug === item.slug &&
//               p.attributes &&
//               item.attributes &&
//               areAttributesEqual(p.attributes, item.attributes),
//           );
//           console.log(2323233);
//           console.log(updatedCart);
//           console.log(333333);

//           if (!freshItem) return item;

//           return {
//             ...item,
//             price: freshItem.price,
//             availableQuantity: freshItem.stock,
//             hasChanged:
//               item.price !== freshItem.price || freshItem.stock < item.quantity,
//           };
//         });

//         // Зберігаємо оновлену корзину (можна у localStorage, якщо потрібно)
//         // localStorage.setItem("cart", JSON.stringify(updatedCart));

//         // Оповіщаємо додаток про оновлення корзини
//         window.dispatchEvent(new Event("cartUpdated"));
//       })
//       .catch(() => {
//         sessionStorage.setItem("cart_synced", "1");
//       });
//   }, []);

//   return null;
// };

// export default CartSync;
