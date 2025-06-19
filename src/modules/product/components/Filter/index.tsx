import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DropdownFilter from "../DropdownFilter";
import { categories, subCategories } from "./data";
import styles from "./index.module.scss";

const Filter = () => {
  const { t } = useTranslation();

  const { category } = useParams();

  const filteredValuesCategory =
    category && categories.length > 0 ? categories[0][category] ?? [] : [];

  const filteredValuesSubCategory = category
    ? subCategories.find((obj) => category in obj)?.[category] ?? []
    : [];

  return (
    <div className={styles.filter}>
      <button className={styles.clearBtn}>
        {t("filter.clearEverything")}.
      </button>
      <form className={styles.form}>
        <div className={styles.categories}>
          <h2>{t("filter.categories")}</h2>
          {filteredValuesCategory.map((item, index) => {
            const isLast = index === filteredValuesCategory.length - 1;

            return (
              <label>
                <input type="checkbox" defaultChecked={isLast} />
                <span>{t(item)}</span>
              </label>
            );
          })}
        </div>
        {filteredValuesSubCategory.map(({ label, items }) => (
          <DropdownFilter title={t(`filter.${label}`)} items={items} />
        ))}
      </form>
    </div>
  );
};

export default Filter;
