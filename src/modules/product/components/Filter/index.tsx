import { FC } from "react";
import { useTranslation } from "react-i18next";
import DropdownFilter from "../DropdownFilter";
import styles from "./index.module.scss";

interface itemProps {
  label: string;
  items: string[];
}

interface FilterProps {
  filters: itemProps[];
}

const Filter: FC<FilterProps> = ({ filters }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.filter}>
      <button className={styles.clearBtn}>
        {t("filter.clearEverything")}.
      </button>
      <form className={styles.form}>
        <div className={styles.categories}>
          <h2>{t("filter.categories")}</h2>
          <label>
            <input type="checkbox" />
            <span>20 {t("filter.lines")}</span>
          </label>
          <label>
            <input type="checkbox" />
            <span>28 {t("filter.lines")}</span>
          </label>
          <label>
            <input type="checkbox" />
            <span>{t("eyelashes")}</span>
          </label>
        </div>
        {filters.map(({ label, items }) => (
          <DropdownFilter title={t(`filter.${label}`)} items={items} />
        ))}
      </form>
    </div>
  );
};

export default Filter;
