import { FC } from "react";
import styles from "./index.module.scss";

interface ProductAttributesProps {
  title: string;
  values: string[];
  selectedValue?: string;
  onSelect: (title: string, value: string) => void;
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
      {values.map((value) => (
        <button
          key={value}
          className={`${styles.button} ${
            selectedValue === value ? styles.active : ""
          }`}
          onClick={() => onSelect(title, value)}
        >
          {value}
        </button>
      ))}
    </div>
  </>
);

export default ProductAttributes;
