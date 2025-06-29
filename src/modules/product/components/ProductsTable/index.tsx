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
  console.log(products);

  const [quantities, setQuantities] = useState<
    Record<
      string,
      { quantity: number; attributeName: string; extraPrice: string }
    >
  >({});
  console.log("products", products);

  useEffect(() => {
    if (products) {
      const initialQuantities: Record<
        string,
        { quantity: number; attributeName: string; extraPrice: string }
      > = {};

      products.forEach((product) => {
        product.attributes?.forEach((attr) => {
          console.log(3434);

          console.log(attr.attribute);

          const key = `${product.slug}_${attr.value}`;
          initialQuantities[key] = {
            quantity: Number(attr.quantity) ?? 0,
            attributeName: attr.attribute,
            extraPrice: attr.extraPrice ?? "",
          };
        });
      });
      console.log(343443);
      console.log(initialQuantities);

      setQuantities(initialQuantities);
    }
  }, [products]);

  const handleQuantityChange = (key: string, newQuantity: string) => {
    const num = parseInt(newQuantity);
    if (!isNaN(num) && num >= 0) {
      setQuantities((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          quantity: num,
        },
      }));
    }
  };

  const handleQuantityBlur = async (
    productSlug: string,
    quantity: number,
    attribute: string
  ) => {
    try {
      await updateQuantity({
        slug: productSlug,
        quantity,
        // attribute,
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

  console.log(grouped);

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
                    (() => {
                      const seenAttributes = new Set<string>();
                      return product.attributes.map(
                        ({ attribute, value }, i) => {
                          const key = `${product.slug}_${value}`;
                          const showAttribute = !seenAttributes.has(attribute);
                          if (showAttribute) seenAttributes.add(attribute);

                          return (
                            <div key={i}>
                              {showAttribute && (
                                <p className={styles.attributeNameQuantity}>
                                  {attribute}
                                </p>
                              )}
                              <div className={styles.attributeBoxQuantity}>
                                <input
                                  type="number"
                                  min={0}
                                  value={quantities[key]?.quantity ?? 0}
                                  onChange={(e) =>
                                    handleQuantityChange(key, e.target.value)
                                  }
                                  onBlur={() =>
                                    handleQuantityBlur(
                                      product.slug,
                                      quantities[key]?.quantity ?? 0,
                                      value
                                    )
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.currentTarget.blur();
                                      handleQuantityBlur(
                                        product.slug,
                                        quantities[key]?.quantity ?? 0,
                                        value
                                      );
                                    }
                                  }}
                                  style={{
                                    width: 40,
                                    textAlign: "center",
                                  }}
                                />
                              </div>
                            </div>
                          );
                        }
                      );
                    })()
                  ) : (
                    <span>-</span>
                  )}
                </td>
                <td>
                  {Array.isArray(product.attributes) &&
                  product.attributes.length > 0 ? (
                    <div>
                      {(() => {
                        const seenAttributes = new Set<string>();
                        return product.attributes.map(
                          ({ attribute, value }, i) => {
                            const showAttribute =
                              !seenAttributes.has(attribute);
                            seenAttributes.add(attribute);
                            return (
                              <div key={i}>
                                {showAttribute && (
                                  <p className={styles.attributeName}>
                                    {attribute}:
                                  </p>
                                )}
                                <div className={styles.attributeBox}>
                                  <span>{value}</span>
                                </div>
                              </div>
                            );
                          }
                        );
                      })()}
                    </div>
                  ) : (
                    "-"
                  )}
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
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
