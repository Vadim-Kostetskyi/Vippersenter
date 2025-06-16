import { useTranslation } from "react-i18next";
import Home from "assets/svg/Home";
import Catalog from "assets/svg/Catalog";
import ShoppingCard from "assets/svg/ShoppingCard";
import styles from "./index.module.scss";

const MenuBar = () => {
  const { t } = useTranslation();
  return (
    <ul className={styles.menuBar}>
      <li>
        <a href="#">
          <Home className={styles.icon} />
          {t("footer.main")}
        </a>
      </li>
      <li>
        <a href="#">
          <Catalog className={styles.icon} />
          {t("catalog")}
        </a>
      </li>
      <li>
        <a href="#">
          <ShoppingCard className={styles.icon} />
          {t("footer.shoppingCard")}
        </a>
      </li>
      <li>
        <a href="#">
          <ShoppingCard className={styles.icon} />
          {t("footer.shoppingCard")}
        </a>
      </li>
    </ul>
  );
};

export default MenuBar;
