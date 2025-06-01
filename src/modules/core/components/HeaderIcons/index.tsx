import SearchButton from "../SearchButton/insex";
import ShoppingBag from "../ShoppingBag";
import styles from "./index.module.scss";

const HeaderIcons = () => {
  return (
    <div className={styles.headerIcons}>
      <SearchButton isLaptop={true} />
      <ShoppingBag />
    </div>
  );
};

export default HeaderIcons;
