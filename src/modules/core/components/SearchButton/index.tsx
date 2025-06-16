import { useState, FC } from "react";
import Search from "assets/svg/Search";
import styles from "./index.module.scss";

interface SearchButtonProps {
  isLaptop?: boolean;
}

const SearchButton: FC<SearchButtonProps> = ({ isLaptop }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const toggleInput = () => setIsOpen((prev) => !prev);
  const closeInput = () => setIsOpen(false);

  return (
    <div className={styles.searchWrapper}>
      {!isOpen && (
        <button
          className={isLaptop ? styles.searchBtn : styles.searchBtnMobile}
          onClick={toggleInput}
          aria-label="Open search input"
        >
          <Search className={styles.search} />
        </button>
      )}

      {isOpen && (
        <div className={styles.inputWrapper}>
          <Search className={styles.iconLeft} />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button
            onClick={closeInput}
            className={styles.clearBtn}
            aria-label="Close search input"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchButton;
