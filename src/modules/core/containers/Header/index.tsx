import { Link, useLocation } from "react-router-dom";
// import Logo from "assets/svg/Logo";
import BurgerMenu from "modules/core/components/BurgerMenu";
import SearchButton from "modules/core/components/SearchButton";
import HeaderIcons from "modules/core/components/HeaderIcons";
import HeaderNavigation from "modules/core/components/HeaderNavigation";
import logoImg from "assets/logo.png";
import styles from "./index.module.scss";
import Logo from "components/Logo";

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header>
      <div className={styles.container}>
        <SearchButton />
        <HeaderNavigation />
        {isHome ? (
          // <Logo className={styles.logo} />
          <Logo />
        ) : (
          <Link to="/">
            {/* <Logo className={styles.logo} /> */}
            <Logo />
          </Link>
        )}
        <HeaderIcons />
        <BurgerMenu />
      </div>
    </header>
  );
};

export default Header;
