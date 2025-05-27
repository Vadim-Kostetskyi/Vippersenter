import { FC } from "react";
import Cross from "assets/svg/Cross";
import Logo from "assets/svg/Logo";
import styles from "./index.module.scss";
import Categories from "components/Categories/insex";

interface HeaderModalProps {
  onClose: () => void;
}

const HeaderModal: FC<HeaderModalProps> = ({ onClose }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <Logo className={styles.logo} />
        <button className={styles.closeBtn} onClick={onClose}>
          <Cross />
        </button>
      </div>
      <Categories />
    </div>
  );
};

export default HeaderModal;
