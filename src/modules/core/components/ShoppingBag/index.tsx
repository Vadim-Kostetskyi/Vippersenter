import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ShoppingCard from "assets/svg/ShoppingCard";
import emptyImg from "assets/svg/EmptyCart.svg";
import CardButton from "../CardButton";
import ShoppingBagList from "../ShoppingBagList";
import { CartItem, getCartItems } from "utils/card";
import styles from "./index.module.scss";

const ShoppingBag = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const { t } = useTranslation();

  const quantityOfProducts = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const getTotalCartPrice = (items: { price: number; quantity: number }[]) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const onSetProducts = (items: CartItem[]) => setCartItems(items);

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
            <div>
              <span>Разом {getTotalCartPrice(cartItems).toFixed(2)}</span>
            </div>
            <div className={styles.continueShoppingBox}>
              <CardButton
                title={t("shoppingCard.continueShopping")}
                onClick={onClose}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingBag;
