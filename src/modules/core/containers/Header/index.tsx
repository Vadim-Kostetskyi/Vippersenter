import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import Search from "assets/svg/Search";

const Header = () => {
  const { t } = useTranslation();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Search className={styles.search} />
      </div>
    </header>
  );
};

export default Header;
