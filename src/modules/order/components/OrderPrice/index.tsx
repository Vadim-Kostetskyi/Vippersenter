import { FC } from "react";
import styles from "./index.module.scss";
import { formatPrice } from "utils/formatPrice";

interface OrderPriceProps {
  title: string;
  price: number | string;
  currency: string;
}

const OrderPrice: FC<OrderPriceProps> = ({ title, price, currency }) => {
  const { value, showCurrency } = formatPrice(price);

  return (
    <div className={styles.priceBox}>
      <span>{title}</span>
      <span>
        {value}
        {showCurrency && currency}
      </span>
    </div>
  );
};

export default OrderPrice;
