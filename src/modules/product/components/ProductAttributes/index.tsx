import { FC } from "react";
import styles from "./index.module.scss";

interface ProductAttributesProps {
  title: string;
  values: string[];
  selectedValue?: string;
  onSelect: (title: string, value: string) => void;
  availableValues: Set<string>;
  lastAttr?: boolean;
}

const ProductAttributes: FC<ProductAttributesProps> = ({
  title,
  values,
  selectedValue,
  onSelect,
  availableValues,
  lastAttr,
}) => {
  console.log(availableValues);
  
  return (
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
              : "sdfsdf"
          }`}
          onClick={() => onSelect(title, attribute)}
          disabled={!availableValues.has(attribute) && lastAttr}
        >
          {attribute}
        </button>
      ))}
    </div>
  </>
)};

export default ProductAttributes;
