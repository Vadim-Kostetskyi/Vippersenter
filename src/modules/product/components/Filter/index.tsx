import { FC } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DropdownFilter from "../DropdownFilter";
import styles from "./index.module.scss";
import { categories } from "./data";

interface itemProps {
  label: string;
  items: string[];
}

interface FilterProps {
  filters: itemProps[];
}

const Filter: FC<FilterProps> = ({ filters }) => {
  const { t } = useTranslation();

  const { category } = useParams();

  const filteredValues =
    category && categories.length > 0 ? categories[0][category] ?? [] : [];

  return (
    <div className={styles.filter}>
      <button className={styles.clearBtn}>
        {t("filter.clearEverything")}.
      </button>
      <form className={styles.form}>
        <div className={styles.categories}>
          <h2>{t("filter.categories")}</h2>
          {filteredValues.map((item, index) => {
            const isLast = index === filteredValues.length - 1;

            return (
              <label>
                <input type="checkbox" defaultChecked={isLast} />
                <span>{t(item)}</span>
              </label>
            );
          })}
        </div>
        {filters.map(({ label, items }) => (
          <DropdownFilter title={t(`filter.${label}`)} items={items} />
        ))}
      </form>
    </div>
  );
};

export default Filter;
