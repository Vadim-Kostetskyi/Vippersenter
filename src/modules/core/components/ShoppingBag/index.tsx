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
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const { t } = useTranslation();
  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  useEffect(() => {
    const updateCart = () => {
      const updated = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(updated);
    };

    window.addEventListener("cartUpdated", updateCart);
    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  const quantityOfProducts = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalCartPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const onSetProducts = (items: CartItem[]) => {
    setCartItems(items);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeCartItem = (slug: string, attributes?: CartAttributes[]) => {
    const updatedCart = cartItems.filter((item) => {
      if (item.slug !== slug) return true;

      if (!item.attributes && !attributes) return true;
      if (!item.attributes || !attributes) return false;
      if (item.attributes.length !== attributes.length) return true;

      const isSame = item.attributes.every((attr) =>
        attributes.some(
          (a) =>
            a.attribute === attr.parameter && a.attribute === attr.attribute,
        ),
      );

      return !isSame;
    });

    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
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
        {quantityOfProducts ? <span>{quantityOfProducts}</span> : null}
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
              <LangLink to={cartItems.length > 0 ? "/checkout" : "#"}>
                <CardButton
                  title={t("shoppingCard.placeAnOrder")}
                  placeOrder={true}
                />
              </LangLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingBag;
