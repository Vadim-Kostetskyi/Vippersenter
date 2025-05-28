import { FC } from "react";
import Cross from "assets/svg/Cross";
import Logo from "assets/svg/Logo";
import CategoriesHeader from "components/CategoriesHeader/insex";
import styles from "./index.module.scss";

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
      <nav>
        <CategoriesHeader />
      </nav>
    </div>
  );
};

export default HeaderModal;
