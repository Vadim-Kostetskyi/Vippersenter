import { FC, useEffect, useState } from "react";
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
  assignedQuantity: number;
  setProducts: (items: CartItem[]) => void;
  delProduct: (
    productId: string,
    attributes?: {
      name: string;
      value: string;
    }[]
  ) => void;
  attributes?: {
    name: string;
    value: string;
  }[];
}

const ShoppingBagCard: FC<ShoppingBagCardProps> = ({
  id,
  assignedQuantity,
  setProducts,
  delProduct,
  attributes,
}) => {
  const { data: product } = useGetProductByIdQuery(id);
  const { name = "", image = "", price = 0, quantity = 0 } = product ?? {};
  const [count, setCount] = useState(assignedQuantity);

  useEffect(() => {
    setCount(assignedQuantity);
  }, [assignedQuantity]);

  const { t } = useTranslation();

  const handleIncrement = () => {
    setCount((prev) => {
      const newCount = prev + 1;
      updateCartItemQuantity(id, newCount, attributes);
      const cards = getCartItems();
      setProducts(cards);
      return newCount;
    });
  };

  const handleDecrement = () => {
    setCount((prev) => {
      const newCount = prev > 1 ? prev - 1 : 1;
      updateCartItemQuantity(id, newCount, attributes);
      const cards = getCartItems();
      setProducts(cards);
      return newCount;
    });
  };

  const totalPrice = count * price;

  return (
    <div className={styles.shoppingBagCard}>
      <a href={`/product/${id}`}>
        <img src={image} alt="" />
      </a>
      <div className={styles.infoBox}>
        <div>
          <a href={`/product/${id}`}>
            <h3>{name}</h3>
          </a>
          <button
            onClick={() => {
              removeCartItem(id, attributes);
              delProduct(id, attributes);
            }}
          >
            <img src={TrashIcon} alt="delete item" />
          </button>
        </div>
        {attributes?.map(({ name, value }) => (
          <div className={styles.attributes}>
            <span>{name}:</span> <span>{value}</span>
          </div>
        ))}
        <div>
          <div className={styles.quantityBox}>
            <button onClick={handleDecrement}>
              <Minus />
            </button>
            <input type="number" value={count} />
            <button onClick={handleIncrement} disabled={count >= quantity}>
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
