import { useLocation } from "react-router-dom";
import Logo from "assets/svg/Logo";
import BurgerMenu from "modules/core/components/BurgerMenu";
import SearchButton from "modules/core/components/SearchButton/insex";
import HeaderIcons from "modules/core/components/HeaderIcons";
import HeaderNavigation from "modules/core/components/HeaderNavigation";
import styles from "./index.module.scss";

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header>
      <div className={styles.container}>
        <SearchButton />
        <HeaderNavigation />
        {isHome ? (
          <Logo className={styles.logo} />
        ) : (
          <a href="/">
            <Logo className={styles.logo} />
          </a>
        )}
        <HeaderIcons />
        <BurgerMenu />
      </div>
    </header>
  );
};

export default Header;
