import React, { FC } from "react";
import Cross from "assets/svg/Cross";
import { Product } from "storeRedux/types";
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
          {titles.map((title) => <th>{title}</th>)}
        </tr>
      </thead>
      <tbody>
        {Object.entries(grouped).map(([category, items]) => (
          <React.Fragment key={category}>
            <tr>
              <td
                colSpan={6}
                style={{ fontWeight: "bold", backgroundColor: "#eee" }}
              >
                {category}
              </td>
            </tr>
            {items.map((product) => {
              const attrMainValues = Array.from(
                new Set(product.attributes?.map((a) => a.value_main) || [])
              );
              const attrSecondaryValues = Array.from(
                new Set(product.attributes?.map((a) => a.value_secondary) || [])
              );
              const attrTertiaryValues = Array.from(
                new Set(product.attributes?.map((a) => a.value_tertiary) || [])
              );

              const selected = selectedAttributes[product.slug] || {
                main: "",
                secondary: "",
                tertiary: "",
              };

              const quantityKey = `${product.slug}_${selected.main}_${
                selected.secondary ?? ""
              }_${selected.tertiary ?? ""}`;
              const quantity =
                quantities[quantityKey]?.quantity ?? product.quantity;

              return (
                <tr key={product.slug}>
                  <td>{product.name}</td>
                  <td style={{ textAlign: "center" }}>{product.price}</td>
                  <td>
                    <input
                      type="number"
                      min={0}
                      value={quantity}
                      onChange={(e) =>
                        handleQuantityChange(quantityKey, e.target.value)
                      }
                      onBlur={() =>
                        handleQuantityBlur(
                          product.slug,
                          +quantity,
                          selected.main,
                          selected.secondary,
                          selected.tertiary
                        )
                      }
                      style={{ width: 30, textAlign: "center" }}
                    />
                  </td>
                  <td className={styles.attributes}>
                    <div
                      style={{
                        display: "flex",
                        gap: 16,
                        justifyContent: "center",
                        padding: 10,
                      }}
                    >
                      {/* main attribute */}
                      {attrMainValues.length > 0 && (
                        <div>
                          <p>
                            <b>
                              {product.attributes?.[0]?.attribute_main ||
                                "Main"}
                            </b>
                          </p>
                          {attrMainValues.map((val) => (
                            <div key={val} className={styles.radioWrapper}>
                              <label className={styles.radioLabel}>
                                <input
                                  type="radio"
                                  name={`${product.slug}_main`}
                                  value={val}
                                  checked={selected.main === val}
                                  onChange={() =>
                                    handleAttributeChange(
                                      product.slug,
                                      "main",
                                      val
                                    )
                                  }
                                  style={{ marginRight: 6 }}
                                />
                                <span>{val}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* secondary attribute */}
                      {attrSecondaryValues[0] && (
                        <div>
                          <p>
                            <b>
                              {product.attributes?.[0]?.attribute_secondary ||
                                "Secondary"}
                            </b>
                          </p>
                          {attrSecondaryValues.map((val) => (
                            <div key={val} className={styles.radioWrapper}>
                              <label className={styles.radioLabel}>
                                <input
                                  type="radio"
                                  name={`${product.slug}_secondary`}
                                  value={val ?? ""}
                                  checked={selected.secondary === val}
                                  onChange={() =>
                                    handleAttributeChange(
                                      product.slug,
                                      "secondary",
                                      val ?? ""
                                    )
                                  }
                                  style={{ marginRight: 6 }}
                                />
                                <span>{val}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* tertiary attribute */}
                      {attrTertiaryValues[0] && (
                        <div>
                          <p>
                            <b>
                              {product.attributes?.[0]?.attribute_tertiary ||
                                "Tertiary"}
                            </b>
                          </p>
                          {attrTertiaryValues.map((val) => (
                            <div key={val} className={styles.radioWrapper}>
                              <label className={styles.radioLabel}>
                                <input
                                  type="radio"
                                  name={`${product.slug}_tertiary`}
                                  value={val ?? ""}
                                  checked={selected.tertiary === val}
                                  onChange={() =>
                                    handleAttributeChange(
                                      product.slug,
                                      "tertiary",
                                      val ?? ""
                                    )
                                  }
                                  style={{ marginRight: 6 }}
                                />
                                <span>{val}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <p>{product.description}</p>
                  </td>
                  <td style={{ textAlign: "center" }}>
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