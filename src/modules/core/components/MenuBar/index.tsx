import { useTranslation } from "react-i18next";
import Home from "assets/svg/Home";
import Catalog from "assets/svg/Catalog";
import ShoppingCard from "assets/svg/ShoppingCard";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import ShoppingBag from "../ShoppingBag";

const MenuBar = () => {
  const { t } = useTranslation();
  return (
    <ul className={styles.menuBar}>
      <li>
        <Link to="/">
          <Home className={styles.icon} />
          {t("footer.main")}
        </Link>
      </li>
      <li>
        <Link to="/product-category ">
          <Catalog className={styles.icon} />
          {t("catalog")}
        </Link>
      </li>
      <li>
          <ShoppingBag />
          {t("footer.shoppingCard")}
      </li>
      <li>
          <ShoppingBag />
          {t("footer.shoppingCard")}
      </li>
    </ul>
  );
};

export default MenuBar;
