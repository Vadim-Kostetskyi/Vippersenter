import Search from "assets/svg/Search";
import styles from "./index.module.scss";

const SearchButton = () => {
  return (
    <>
      <button className={styles.searchBtn}>
        <Search className={styles.search} />
      </button>
    </>
  );
};

export default SearchButton;
