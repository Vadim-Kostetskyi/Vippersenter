import { useTranslation } from "react-i18next";
import LangLink from "utils/LangLink";
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
              <LangLink to={link}>{t(title)}</LangLink>
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
