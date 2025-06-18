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

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    if (products) {
      const initialQuantities: Record<string, number> = {};
      products.forEach((p) => {
        initialQuantities[p._id] = p.quantity;
      });
      setQuantities(initialQuantities);
    }
  }, [products]);

  if (isLoading) return <div>...</div>;
  if (isError || !products) return <div>Data loading error</div>;

  const grouped = products.reduce<Record<string, Product[]>>((acc, product) => {
    acc[product.category] = acc[product.category] || [];
    acc[product.category].push(product);
    return acc;
  }, {});

  const handleQuantityChange = (id: string, value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num >= 0) {
      setQuantities((prev) => ({ ...prev, [id]: num }));
    }
  };

  const handleQuantityBlur = async (id: string) => {
    const quantity = quantities[id];
    try {
      await updateQuantity({ id, quantity }).unwrap();
    } catch (e) {
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
              <tr key={product._id}>
                <td>{product.name}</td>
                <td style={{ textAlign: "center" }}>{product.price}</td>
                <td style={{ textAlign: "center" }}>
                  <input
                    type="number"
                    min={0}
                    value={quantities[product._id] ?? product.quantity}
                    onChange={(e) =>
                      handleQuantityChange(product._id, e.target.value)
                    }
                    onBlur={() => handleQuantityBlur(product._id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.currentTarget.blur();
                        handleQuantityBlur(product._id);
                      }
                    }}
                    style={{ width: 40, textAlign: "center" }}
                  />
                </td>
                <td>
                  {Array.isArray(product.attributes) &&
                  product.attributes.length > 0 ? (
                    <div>
                      {product.attributes.map((attr, i) => (
                        <div key={i}>
                          <strong>{attr.name}:</strong>{" "}
                          {Array.isArray(attr.values) && attr.values.length > 0
                            ? attr.values.join(", ")
                            : "-"}
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
                  <button onClick={() => handleDelete(product._id)}>
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
