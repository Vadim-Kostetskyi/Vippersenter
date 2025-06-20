import { useTranslation } from "react-i18next";
import { FC, useState } from "react";
import Filters from "assets/svg/Filters";
import Cross from "assets/svg/Cross";
import Filter from "../Filter";
import styles from "./index.module.scss";

interface FilterButtonProps {
  filtration: (attributeName: string, value: string, checked: boolean) => void;
}

const FilterButton: FC<FilterButtonProps> = ({ filtration }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button className={styles.filterButton} onClick={onOpen}>
        <Filters className={styles.icon} />
        {t("filter.filters")}
      </button>
      {isOpen && (
        <div className={`${styles.filtersBox} ${styles.open}`}>
          <button onClick={onClose} className={styles.crossBtn}>
            <Cross className={styles.crossIcon} />
          </button>
          <h2 className={styles.title}>{t("filter.filterProducts")}</h2>
          <Filter filtration={filtration} />
        </div>
      )}
      <div className={styles.filter}>
        <Filter filtration={filtration} />
      </div>
    </>
  );
};

export default FilterButton;
