import Logo from "assets/svg/Logo";
import BurgerMenu from "modules/core/components/BurgerMenu";
import SearchButton from "modules/core/components/SearchButton/insex";
import HeaderIcons from "modules/core/components/HeaderIcons";
import HeaderNavigation from "modules/core/components/HeaderNavigation";
import styles from "./index.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <SearchButton />
        <HeaderNavigation />
        <Logo className={styles.logo} />
        <HeaderIcons />
        <BurgerMenu />
      </div>
    </header>
  );
};

export default Header;
