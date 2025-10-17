import { FC } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DropdownFilter from "../DropdownFilter";
import { categories, subCategories } from "./data";
import { Product } from "storeRedux/types";
import styles from "./index.module.scss";

export interface Attribute {
  attribute_main?: string;
  value_main?: string;
  attribute_secondary?: string;
  value_secondary?: string;
  attribute_tertiary?: string;
  value_tertiary?: string;
}

interface AttributeList {
  label: string;
  items: string[];
}

export function collectAttributesFromProducts(
  products: Product[]
): AttributeList[] {
  const attributesMap = new Map<string, Set<string>>();

  for (const product of products) {
    if (!product.attributes || !Array.isArray(product.attributes)) continue;

    for (const attr of product.attributes) {
      if (attr.attribute_main && attr.value_main) {
        if (!attributesMap.has(attr.attribute_main)) {
          attributesMap.set(attr.attribute_main, new Set());
        }
        attributesMap.get(attr.attribute_main)!.add(attr.value_main);
      }

      if (attr.attribute_secondary && attr.value_secondary) {
        if (!attributesMap.has(attr.attribute_secondary)) {
          attributesMap.set(attr.attribute_secondary, new Set());
        }
        attributesMap.get(attr.attribute_secondary)!.add(attr.value_secondary);
      }

      if (attr.attribute_tertiary && attr.value_tertiary) {
        if (!attributesMap.has(attr.attribute_tertiary)) {
          attributesMap.set(attr.attribute_tertiary, new Set());
        }
        attributesMap.get(attr.attribute_tertiary)!.add(attr.value_tertiary);
      }
    }
  }

  return Array.from(attributesMap.entries()).map(([label, values]) => ({
    label,
    items: Array.from(values),
  }));
}

interface FilterProps {
  filtration: (attributeName: string, value: string, checked: boolean) => void;
  products: Product[] | undefined;
}

const Filter: FC<FilterProps> = ({ filtration, products }) => {
  const { t } = useTranslation();

  const { category } = useParams();

  const filteredValuesCategory =
    category && categories.length > 0 ? categories[0][category] ?? [] : [];

  // const filteredValuesSubCategory = category
  //   ? subCategories.find((obj) => category in obj)?.[category] ?? []
  //   : [];

  // console.log(products[0].attributes);
  // console.log(filteredValuesSubCategory);
  let attributes: AttributeList[] = [];

  if (products) {
    attributes = collectAttributesFromProducts(products);
  }

  console.log(attributes);
  console.log(filteredValuesCategory);

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
        {attributes.map(({ label, items }) => (
          <DropdownFilter
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
