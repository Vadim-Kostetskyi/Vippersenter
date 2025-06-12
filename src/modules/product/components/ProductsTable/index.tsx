import { useTranslation } from "react-i18next";
import React from "react";
import { useGetProductsQuery } from "storeRedux/productsApi";
import { Product } from "storeRedux/types";
import styles from "./index.module.scss";

const ProductsTable = () => {
  const { t } = useTranslation();
  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (isLoading) return <div>...</div>;
  if (isError || !products) return <div>Data loading error</div>;

  const grouped = products.reduce<Record<string, Product[]>>((acc, product) => {
    acc[product.category] = acc[product.category] || [];
    acc[product.category].push(product);
    return acc;
  }, {});

  console.log(products);

  return (
    <table border={1} cellPadding={8} className={styles.productsTable}>
      <thead>
        <tr>
          <th>{t("product.title")}</th>
          <th>{t("product.price")}</th>
          <th>{t("product.quantity")}</th>
          <th>{t("product.characteristics")}</th>
          <th>{t("form.description")}</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(grouped).map(([category, items]) => (
          <React.Fragment key={category}>
            <tr>
              <td
                colSpan={5}
                style={{ fontWeight: "bold", backgroundColor: "#eee" }}
              >
                {category}
              </td>
            </tr>
            {items.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td style={{ textAlign: "center" }}>{product.price}</td>
                <td style={{ textAlign: "center" }}>{product.quantity}</td>
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
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
