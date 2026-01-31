import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LangLink from "utils/LangLink";
import ShoppingCard from "assets/svg/ShoppingCard";
import CardButton from "../CardButton";
import ShoppingBagList from "../ShoppingBagList";
import { getCartItems } from "utils/card";
import emptyImg from "assets/svg/EmptyCart.svg";
import { CartAttributes, CartItem } from "types/types";
import styles from "./index.module.scss";

const ShoppingBag = () => {
  const { t } = useTranslation();

  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // початкове завантаження
  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  // синхронізація через custom event
  useEffect(() => {
    const updateCart = () => {
      setCartItems(JSON.parse(localStorage.getItem("cart") || "[]"));
    };

    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  const quantityOfProducts = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const totalCartPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const onSetProducts = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const isSameAttributes = (
    a?: CartAttributes[],
    b?: CartAttributes[],
  ): boolean => {
    if (!a && !b) return true;
    if (!a || !b) return false;
    if (a.length !== b.length) return false;

    return a.every((attr) =>
      b.some(
        (x) => x.parameter === attr.parameter && x.attribute === attr.attribute,
      ),
    );
  };

  const removeCartItem = (slug: string, attributes?: CartAttributes[]) => {
    const updated = cartItems.filter(
      (item) =>
        item.slug !== slug || !isSameAttributes(item.attributes, attributes),
    );

    onSetProducts(updated);
  };

  const onOpenBag = () => {
    setIsVisible(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const onClose = () => {
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  return (
    <>
      <button className={styles.shoppingBagBtn} onClick={onOpenBag}>
        <ShoppingCard className={styles.icon} />
        {!!quantityOfProducts && <span>{quantityOfProducts}</span>}
      </button>

      {isVisible && (
        <div className={styles.shoppingBagWrapper} onClick={onClose}>
          <div
            className={`${styles.shoppingBag} ${
              isAnimating ? styles.shoppingBagOpen : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{t("shoppingCard.card")}</h2>

            <div className={styles.products}>
              {quantityOfProducts ? (
                <ShoppingBagList
                  products={cartItems}
                  setProducts={onSetProducts}
                  delProduct={removeCartItem}
                />
              ) : (
                <div className={styles.emptyBox}>
                  <img src={emptyImg} alt="" />
                  <span>{t("shoppingCard.yourCardEmpty")}</span>
                  <CardButton
                    title={t("shoppingCard.returnToStore")}
                    onClick={onClose}
                  />
                </div>
              )}
            </div>

            <div className={styles.continueShoppingBox}>
              <div>
                <span>{t("shoppingCard.total")}</span>
                <span>
                  {totalCartPrice.toFixed(2)}
                  {t("currency")}
                </span>
              </div>

              <CardButton
                title={t("shoppingCard.continueShopping")}
                onClick={onClose}
              />

              <LangLink to={cartItems.length ? "/checkout" : "#"}>
                <CardButton title={t("shoppingCard.placeAnOrder")} placeOrder />
              </LangLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingBag;
