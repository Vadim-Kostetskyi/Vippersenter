import Logo from "assets/svg/Logo";
import BurgerMenu from "modules/core/components/BurgerMenu";
import SearchButton from "modules/core/components/SearchButton/insex";
import styles from "./index.module.scss";
import HeaderIcons from "modules/core/components/HeaderIcons";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <SearchButton />
        <Logo className={styles.logo} />
        <HeaderIcons />
        <BurgerMenu />
      </div>
    </header>
  );
};

export default Header;
