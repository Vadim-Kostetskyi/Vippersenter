import Logo from "assets/svg/Logo";
import BurgerMenu from "modules/core/components/BurgerMenu";
import SearchButton from "modules/core/components/SearchButton/insex";
import styles from "./index.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <SearchButton />
        <Logo className={styles.logo} />
        <BurgerMenu />
      </div>
    </header>
  );
};

export default Header;
