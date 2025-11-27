import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DropdownFilter from "../DropdownFilter";
import { categories } from "./data";
import { collectAttributesFromProducts } from "utils/collectAttributes";
import { Product } from "storeRedux/types";
import styles from "./index.module.scss";

interface AttributeList {
  label: string;
  items: string[];
}

interface FilterProps {
  filtration: (attributeName: string, value: string, checked: boolean) => void;
  products: Product[] | undefined;
}

const Filter: FC<FilterProps> = ({ filtration, products }) => {
  const [attributes, setAttributes] = useState<AttributeList[]>([]);

  const { t } = useTranslation();
  const { category } = useParams();

  useEffect(() => {
    if (products && attributes.length === 0) {
      setAttributes(collectAttributesFromProducts(products));
    }
  }, [products]);

  const filteredValuesCategory =
    category && categories.length > 0 ? categories[0][category] ?? [] : [];

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
              <label key={item}>
                <input type="checkbox" defaultChecked={isLast} />
                <span>{t(item)}</span>
              </label>
            );
          })}
        </div>
        {attributes.map(({ label, items }) => (
          <DropdownFilter
            key={label}
            title={t(`filter.${label}`)}
            items={items}
            onFilter={filtration}
          />
        ))}
      </form>
    </div>
  );
};

export default Filter;
