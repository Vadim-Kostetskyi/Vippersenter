import { FC, useState } from "react";
import { useGetProductByIdQuery } from "storeRedux/productsApi";
import TrashIcon from "assets/svg/TrashCan.svg";
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";
import Minus from "assets/svg/Minus";
import PlusSubtle from "assets/svg/PlusSubtle";
import {
  CartItem,
  getCartItems,
  removeCartItem,
  updateCartItemQuantity,
} from "utils/card";

interface ShoppingBagCardProps {
  id: string;
  quantity: number;
  setProducts: (items: CartItem[]) => void;
}

const ShoppingBagCard: FC<ShoppingBagCardProps> = ({
  id,
  quantity,
  setProducts,
}) => {
  const { data: product } = useGetProductByIdQuery(id);
  const { name = "", image = "", price = 0 } = product ?? {};
  const [count, setCount] = useState(quantity);

  const { t } = useTranslation();

  const handleIncrement = () => {
    setCount((prev) => {
      const newCount = prev + 1;
      updateCartItemQuantity(id, newCount);
      return newCount;
    });

    const cards = getCartItems();
    setProducts(cards);
  };

  const handleDecrement = () => {
    setCount((prev) => {
      const newCount = prev > 1 ? prev - 1 : 1;
      updateCartItemQuantity(id, newCount);
      return newCount;
    });
    const cards = getCartItems();
    setProducts(cards);
  };

  const totalPrice = count * price;

  return (
    <div className={styles.shoppingBagCard}>
      <img src={image} alt="" />
      <div className={styles.infoBox}>
        <div>
          <h3>{name}</h3>
          <button
            onClick={() => {
              removeCartItem(id);
            }}
          >
            <img src={TrashIcon} alt="delete item" />
          </button>
        </div>
        <div>
          <div className={styles.quantityBox}>
            <button onClick={handleDecrement}>
              <Minus />
            </button>
            <input type="number" value={count} />
            <button onClick={handleIncrement}>
              <PlusSubtle />
            </button>
          </div>
          <span className={styles.price}>
            {totalPrice.toFixed(2)}
            {t("currency")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShoppingBagCard;
