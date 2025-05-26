import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";

const Header = () => {
  const { t } = useTranslation();
  return <header className={styles.header}></header>;
};

export default Header;
