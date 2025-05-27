import Search from "assets/svg/Search";
import Logo from "assets/svg/Logo";
import BurgerMenu from "modules/core/components/BurgerMenu";
import styles from "./index.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button className={styles.searchBtn}>
          <Search className={styles.search} />
        </button>
        <Logo className={styles.logo} />
        <BurgerMenu />
      </div>
    </header>
  );
};

export default Header;
