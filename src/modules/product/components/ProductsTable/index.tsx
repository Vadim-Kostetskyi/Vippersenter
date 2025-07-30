import React, { FC } from "react";
import { Product } from "storeRedux/types";
import { attributesTable } from "./data";
import Cross from "assets/svg/Cross";
import styles from "./index.module.scss";

interface ProductsTableProps {
  titles: string[];
  grouped: Record<string, Product[]>;
  selectedAttributes: Record<
    string,
    {
      main: string;
      secondary: string;
      tertiary: string;
    }
  >;
  quantities: Record<
    string,
    {
      quantity: number;
      value_main?: string;
      value_secondary?: string;
      value_tertiary?: string;
      extraPrice: string;
    }
  >;
  handleQuantityChange: (key: string, newQuantity: string) => void;
  handleQuantityBlur: (
    productSlug: string,
    quantity: number,
    value_main: string,
    value_secondary?: string,
    value_tertiary?: string
  ) => Promise<void>;
  handleAttributeChange: (
    productSlug: string,
    attrType: "main" | "secondary" | "tertiary",
    value: string
  ) => void;
  handleDelete: (id: string) => Promise<void>;
}

const ProductsTable: FC<ProductsTableProps> = ({
  titles,
  grouped,
  selectedAttributes,
  quantities,
  handleQuantityChange,
  handleQuantityBlur,
  handleAttributeChange,
  handleDelete
}) =>  (
    <table border={1} cellPadding={8} className={styles.productsTable}>
      <thead>
        <tr>
          {titles.map((title) => <th key={title}>{title}</th>)}
        </tr>
      </thead>
      <tbody>
        {Object.entries(grouped).map(([category, items]) => (
          <React.Fragment key={category}>
            <tr>
              <td colSpan={6} className={styles.category}>
                {category}
              </td>
            </tr>
            {items.map((product) => {
              const attrValues = attributesTable(product);

              const selected = selectedAttributes[product.slug] || {
                main: "",
                secondary: "",
                tertiary: "",
              };

              const { main, secondary, tertiary } = selected;

              const quantityKey = `${product.slug}_${main}_${
                secondary ?? ""
              }_${tertiary ?? ""}`;
              const quantity =
                quantities[quantityKey]?.quantity ?? product.quantity;

              return (
                <tr key={product.slug}>
                  <td>{product.name}</td>
                  <td className={styles.center}>{product.price}</td>
                  <td>
                    <input
                      type="number"
                      min={0}
                      value={quantity}
                      onChange={(e) =>
                        handleQuantityChange(quantityKey, e.target.value)
                      }
                      onBlur={() =>
                        handleQuantityBlur(product.slug, +quantity, main, secondary, tertiary)
                      }
                      className={styles.quantity}
                    />
                  </td>
                  <td className={styles.attributes}>
                    <div>
                      {attrValues.map(({ title, attribute, values }) => (
                        <div key={title}>
                          <p>
                            <b>{product.attributes?.[0]?.[attribute] || ""}</b>
                          </p>
                          {values.map((val) => (
                            <div key={val} className={styles.radioWrapper}>
                              <label className={styles.radioLabel}>
                                <input
                                  type="radio"
                                  name={`${product.slug}_${title}`}
                                  value={val || 0}
                                  checked={selected[title] === val}
                                  onChange={() =>
                                    handleAttributeChange(
                                      product.slug,
                                      title,
                                      val || ""
                                    )
                                  }
                                />
                                <span>{val}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>
                    <p>{product.description}</p>
                  </td>
                  <td className={styles.center}>
                    <button onClick={() => handleDelete(product.slug)}>
                      <Cross className={styles.trashIcon} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );

export default ProductsTable