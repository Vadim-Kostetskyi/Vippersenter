import { useLocation } from "react-router-dom";
import LangLink from "utils/LangLink";
import BurgerMenu from "modules/core/components/BurgerMenu";
import SearchButton from "modules/core/components/SearchButton";
import HeaderIcons from "modules/core/components/HeaderIcons";
import HeaderNavigation from "modules/core/components/HeaderNavigation";
import Logo from "components/Logo";
import styles from "./index.module.scss";

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isHomeEn = location.pathname === "/en/";

  return (
    <header>
      <div className={styles.container}>
        <SearchButton />
        <HeaderNavigation />
        {isHome || isHomeEn ? (
          <Logo />
        ) : (
          <LangLink to="/">
            <Logo />
          </LangLink>
        )}
        <HeaderIcons />
        <BurgerMenu />
      </div>
    </header>
  );
};

export default Header;
