import { FC } from "react";
import { Attribute } from "storeRedux/types";
import styles from "./index.module.scss";

interface ProductAttributesProps {
  title: string;
  values: string[];
  selectedValue?: string;
  onSelect: (title: string, value: string) => void;
  // inStock?: boolean;
  availableValues: Set<string>;
}

const ProductAttributes: FC<ProductAttributesProps> = ({
  title,
  values,
  selectedValue,
  onSelect,
  availableValues,
}) => (
  <>
    <h3 className={styles.title}>{title}</h3>
    <div className={styles.valueBox}>
      {values.map((attribute) => (
        <button
          key={attribute}
          className={`${styles.button} ${
            selectedValue === attribute ? styles.active : ""
          } ${
            !availableValues.has(attribute)
              ? styles.disabled
              : selectedValue === attribute
              ? styles.active
              : ""
          }`}
          onClick={() => onSelect(title, attribute)}
          disabled={!availableValues.has(attribute)}
        >
          {attribute}
        </button>
      ))}
    </div>
  </>
);

export default ProductAttributes;
