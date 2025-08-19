import { FC } from "react";
import styles from "./index.module.scss";

interface OrderPriceProps {
  title: string;
  price: number;
  currency: string;
}

const OrderPrice: FC<OrderPriceProps> = ({ title, price, currency }) => {
  return (
    <div className={styles.priceBox}>
      <span>{title}</span>
      <span>
        {price.toFixed(2)}
        {currency}
      </span>
    </div>
  );
};

export default OrderPrice;
