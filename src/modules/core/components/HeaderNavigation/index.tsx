import { useTranslation } from "react-i18next";
import CatalogHeader from "../CatalogHeader";
import { list } from "./headerList";
import styles from "./index.module.scss";

const HeaderNavigation = () => {
  const { t } = useTranslation();

  return (
    <nav className={styles.headerNavigation}>
      <ul>
        {list.map(({ title, link }, index) =>
          index ? (
            <li key={title}>
              <a href={link}>{t(title)}</a>
            </li>
          ) : (
            <li key={title}>
              <CatalogHeader />
            </li>
          )
        )}
      </ul>
    </nav>
  );
};

export default HeaderNavigation;
