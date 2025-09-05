import { useTranslation } from "react-i18next";
import LangLink from "utils/LangLink";
import Home from "assets/svg/Home";
import Catalog from "assets/svg/Catalog";
import ShoppingBag from "../ShoppingBag";
import styles from "./index.module.scss";

const MenuBar = () => {
  const { t } = useTranslation();

  return (
    <ul className={styles.menuBar}>
      <li>
        <LangLink to="/">
          <Home className={styles.icon} />
          {t("footer.main")}
        </LangLink>
      </li>
      <li>
        <LangLink to="/product-category ">
          <Catalog className={styles.icon} />
          {t("catalog")}
        </LangLink>
      </li>
      <li className={styles.shoppingBag}>
        <ShoppingBag />
        {t("footer.shoppingCard")}
      </li>
    </ul>
  );
};

export default MenuBar;
