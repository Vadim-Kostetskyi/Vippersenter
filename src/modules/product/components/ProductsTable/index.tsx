import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useGetProductsQuery,
  useUpdateProductQuantityMutation,
  useDeleteProductMutation,
} from "storeRedux/productsApi";
import { Product } from "storeRedux/types";
import Cross from "assets/svg/Cross";
import styles from "./index.module.scss";

const ProductsTable = () => {
  const { t } = useTranslation();

  const { data: products, isLoading, isError } = useGetProductsQuery();
  const [updateQuantity] = useUpdateProductQuantityMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [quantities, setQuantities] = useState<Record<string, string>>({});

  useEffect(() => {
    if (products) {
      const initialQuantities: Record<string, string> = {};
      products.forEach((product) => {
        product.attributes?.forEach((attr) => {
          attr.values.forEach((val) => {
            const key = `${product.slug}_${val.attributeName}`;
            initialQuantities[key] = val.extraPrice ?? 0;
          });
        });
      });
      console.log(initialQuantities);

      setQuantities(initialQuantities);
    }
  }, [products]);

  const handleQuantityChange = (key: string, value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num >= 0) {
      setQuantities((prev) => ({ ...prev, [key]: String(num) }));
    }
  };

  const handleQuantityBlur = async (
    productId: string,
    quantity: number,
    attributeName: string
  ) => {
    try {
      await updateQuantity({
        id: productId,
        quantity,
        // attributeName,
      }).unwrap();
    } catch {
      alert(t("product.updateError") || "Error updating quantity");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(`${t("product.confirmDelete")}?`)) {
      try {
        await deleteProduct(id).unwrap();
      } catch {
        alert(t("product.deleteError") || "Error deleting product");
      }
    }
  };

  if (isLoading) return <div>...</div>;
  if (isError || !products) return <div>Data loading error</div>;

  const grouped = products.reduce<Record<string, Product[]>>((acc, product) => {
    acc[product.category] = acc[product.category] || [];
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <table border={1} cellPadding={8} className={styles.productsTable}>
      <thead>
        <tr>
          <th>{t("product.title")}</th>
          <th>{t("product.price")}</th>
          <th>{t("product.quantity")}</th>
          <th>{t("product.characteristics")}</th>
          <th>{t("form.description")}</th>
          <th>{t("actions")}</th>
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
            {items.map((product) => (
              <tr key={product.slug}>
                <td>{product.name}</td>
                <td style={{ textAlign: "center" }}>{product.price}</td>
                <td className={styles.attributes}>
                  {Array.isArray(product.attributes) &&
                  product.attributes.length > 0 ? (
                    product.attributes.map(({ name, values }, i) => (
                      <>
                        <p className={styles.attributeNameQuantity}>{name}</p>
                        <div className={styles.attributeBoxQuantity}>
                          {values.map((val, j) => {
                            const key = `${product.slug}_${val.attributeName}`;
                            console.log(name);

                            return (
                              <div key={`${i}_${j}`}>
                                <input
                                  type="number"
                                  min={0}
                                  value={quantities[key] ?? val.extraPrice ?? 0}
                                  onChange={(e) =>
                                    handleQuantityChange(key, e.target.value)
                                  }
                                  onBlur={() =>
                                    handleQuantityBlur(
                                      product.slug,
                                      +quantities[key],
                                      val.attributeName
                                    )
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.currentTarget.blur();
                                      handleQuantityBlur(
                                        product.slug,
                                        +quantities[key],
                                        val.attributeName
                                      );
                                    }
                                  }}
                                  style={{
                                    width: 40,
                                    marginLeft: 5,
                                    textAlign: "center",
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </>
                    ))
                  ) : (
                    <span>-</span>
                  )}
                </td>
                <td>
                  {Array.isArray(product.attributes) &&
                  product.attributes.length > 0 ? (
                    <div>
                      {product.attributes.map(({ name, values }, i) => (
                        <div key={i}>
                          <p className={styles.attributeName}>{name}:</p>
                          <div className={styles.attributeBox}>
                            {Array.isArray(values) && values.length > 0
                              ? values.map(({ attributeName }, j) => (
                                  <span key={j}>
                                    {attributeName}
                                    {j < values.length - 1 ? " q " : ""}
                                  </span>
                                ))
                              : "-"}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  {product.description.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </td>
                <td style={{ textAlign: "center" }}>
                  <button onClick={() => handleDelete(product.slug)}>
                    <Cross className={styles.trashIcon} />
                  </button>
                </td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
