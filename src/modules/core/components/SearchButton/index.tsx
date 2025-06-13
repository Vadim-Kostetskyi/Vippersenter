import Search from "assets/svg/Search";
import styles from "./index.module.scss";
import { FC } from "react";

interface SearchButtonProps {
  isLaptop?: boolean;
}

const SearchButton: FC<SearchButtonProps> = ({ isLaptop }) => {
  return (
    <>
      <button className={isLaptop ? styles.searchBtn : styles.searchBtnMobile}>
        <Search className={styles.search} />
      </button>
    </>
  );
};

export default SearchButton;
