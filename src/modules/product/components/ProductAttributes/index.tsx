import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";

interface ProductAttributesProps {
  title: string;
  values: string[];
  selectedValue?: string;
  onSelect: (title: string, value: string) => void;
  availableValues: string[];
}

const ProductAttributes: FC<ProductAttributesProps> = ({
  title,
  values,
  selectedValue,
  onSelect,
  availableValues,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <h3 className={styles.title}>{t(`filter.${title}`)}</h3>
      <div className={styles.valueBox}>
        {values.map((attribute) => {
          return (
            <button
              key={attribute}
              className={`${styles.button} ${
                selectedValue === attribute ? styles.active : ""
              } ${
                !availableValues.includes(attribute)
                  ? styles.disabled
                  : selectedValue === attribute
                  ? styles.active
                  : ""
              }`}
              onClick={() => onSelect(title, attribute)}
            >
              {attribute}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default ProductAttributes;
