import { Link } from "react-router-dom";
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
              <Link to={link}>{t(title)}</Link>
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
