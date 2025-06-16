import { FC } from "react";
import styles from "./index.module.scss";

interface CardButtonProps {
  title: string;
  onClick: () => void;
}

const CardButton: FC<CardButtonProps> = ({ title, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {title}
    </button>
  );
};

export default CardButton;
