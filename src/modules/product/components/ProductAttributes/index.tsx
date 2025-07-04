import { FC } from "react";
import styles from "./index.module.scss";
import { Values } from "storeRedux/types";

interface ProductAttributesProps {
  title: string;
  values: Values[];
  selectedValue?: string;
  onSelect: (title: string, value: string, extraPrice: string) => void;
}

const ProductAttributes: FC<ProductAttributesProps> = ({
  title,
  values,
  selectedValue,
  onSelect,
}) => (
  <>
    <h3 className={styles.title}>{title}</h3>
    <div className={styles.valueBox}>
      {values.map(({ attributeName, extraPrice }) => (
        <button
          key={attributeName}
          className={`${styles.button} ${
            selectedValue === attributeName ? styles.active : ""
          }`}
          onClick={() => onSelect(title, attributeName, extraPrice)}
        >
          {attributeName}
        </button>
      ))}
    </div>
  </>
);

export default ProductAttributes;
