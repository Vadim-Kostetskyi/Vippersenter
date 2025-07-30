import { useState, FC } from "react";
import { Link } from "react-router-dom";
import { useGetProductsBySearchQuery } from "storeRedux/productsApi";
import Search from "assets/svg/Search";
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";

interface SearchButtonProps {
  isLaptop?: boolean;
}

const SearchButton: FC<SearchButtonProps> = ({ isLaptop }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { data: products } = useGetProductsBySearchQuery(query.trim());

  const { t } = useTranslation();

  const toggleInput = () => setIsOpen((prev) => !prev);
  const closeInput = () => setIsOpen(false);

  return (
    <div
      className={isLaptop ? styles.searchWrapper : styles.searchWrapperMobile}
    >
      {!isOpen && (
        <button
          className={styles.searchBtn}
          onClick={toggleInput}
          aria-label="Open search input"
        >
          <Search className={styles.search} />
        </button>
      )}

      {isOpen && (
        <>
          <div className={styles.backdrop} onClick={closeInput} />
          <div className={styles.inputWrapper}>
            <div className={styles.inputBox}>
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
              {query.trim() && products ? (
                <ul className={styles.searchList}>
                  {products?.length ? (
                    products.map(({ image, name, slug }) => (
                      <li key={slug}>
                        <Link to={`/product/${slug}`}>
                          <img
                            src={image}
                            alt={name}
                            className={styles.searchListImage}
                          />
                          {name}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li>{t("filter.thereAreNoProducts")}</li>
                  )}
                </ul>
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchButton;
