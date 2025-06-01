import { useTranslation } from "react-i18next";
import CatalogHeader from "../CatalogHeader";
import { list } from "./headerList";
import styles from "./index.module.scss";

const HeaderNavigation = () => {
  const { t } = useTranslation();

  return (
    <nav className={styles.headerNavigation}>
      <ul>
        {list.map((item, index) =>
          index ? (
            <li>
              <a href="#">{t(item)}</a>
            </li>
          ) : (
            <li>
              <CatalogHeader />
            </li>
          )
        )}
      </ul>
    </nav>
  );
};

export default HeaderNavigation;
