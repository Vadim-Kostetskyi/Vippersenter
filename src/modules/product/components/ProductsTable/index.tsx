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

  const [quantities, setQuantities] = useState<
    Record<
      string,
      {
        quantity: number;
        value_main?: string;
        value_secondary?: string;
        value_tertiary?: string;
        extraPrice: string;
      }
    >
  >({});

  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, { main: string; secondary: string; tertiary: string }>
    >({});

    useEffect(() => {
      if (products) {
        setQuantities((prevQuantities) => {
          const newQuantities = { ...prevQuantities };

          products.forEach((product) => {
            product.attributes?.forEach((attr) => {
              const key = `${product.slug}_${attr.value_main ?? ""}_${
                attr.value_secondary ?? ""
              }_${attr.value_tertiary ?? ""}`;

              if (!(key in newQuantities)) {
                newQuantities[key] = {
                  quantity: Number(attr.quantity) ?? 0,
                  value_main: attr.attribute_main,
                  value_secondary: attr.value_secondary,
                  value_tertiary: attr.value_tertiary,
                  extraPrice: attr.extraPrice ?? "",
                };
              }
            });
          });

          return newQuantities;
        });

        setSelectedAttributes((prevSelectedAttrs) => {
          const newSelectedAttrs = { ...prevSelectedAttrs };

          products.forEach((product) => {
            if (!(product.slug in newSelectedAttrs)) {
              if (product.attributes && product.attributes.length > 0) {
                const firstAttr = product.attributes[0];
                newSelectedAttrs[product.slug] = {
                  main: firstAttr.value_main || "",
                  secondary: firstAttr.value_secondary || "",
                  tertiary: firstAttr.value_tertiary || "",
                };
              } else {
                newSelectedAttrs[product.slug] = {
                  main: "",
                  secondary: "",
                  tertiary: "",
                };
              }
            }
          });

          return newSelectedAttrs;
        });
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
    value_main: string,
    value_secondary?: string,
    value_tertiary?: string
  ) => {
    try {
      const payload: any = {
        slug: productSlug,
        quantity,
      };

      if (value_main) {
        payload.value_main = value_main;
      }
      if (value_secondary) {
        payload.value_secondary = value_secondary;
      }
      if (value_tertiary) {
        payload.value_tertiary = value_tertiary;
      }

      await updateQuantity(payload).unwrap();
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

  const handleAttributeChange = (
    productSlug: string,
    attrType: "main" | "secondary" | "tertiary",
    value: string
  ) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [productSlug]: {
        ...prev[productSlug],
        [attrType]: value,
      },
    }));
  };
  console.log(products);
  

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

              const quantityKey = `${product.slug}_${selected.main}_${selected.secondary ?? ''}_${selected.tertiary ?? ''}`;
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
};

export default ProductsTable;
