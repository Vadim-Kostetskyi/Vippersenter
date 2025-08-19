import { FC } from "react";
import styles from "./index.module.scss";

interface CardButtonProps {
  title: string;
  onClick?: () => void;
  placeOrder?: boolean;
}

const CardButton: FC<CardButtonProps> = ({ title, onClick, placeOrder }) => {
  return (
    <button
      className={placeOrder ? styles.placeOrderButton : styles.button}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default CardButton;
