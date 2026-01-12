import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Product } from "storeRedux/types";
import { attributesTable } from "./data";
import Cross from "assets/svg/Cross";
import { isExtraPrice } from "utils/isExtraPrice";
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

  handleExtraPriceChange: (key: string, newQuantity: string) => void;
  handleExtraPriceBlur: (
    productSlug: string,
    extraPrice: number,
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

  prices: Record<string, number>;
  handlePriceChange: (slug: string, price: string) => void;
  handlePriceBlur: (slug: string, price: number) => void;

  handleFlagChange: (
    slug: string,
    flag: "newProduct" | "popularProduct",
    value: boolean
  ) => void;

  handleDescriptionUpdate: (slug: string, newDescription: string) => void;
}

const ProductsTable: FC<ProductsTableProps> = ({
  titles,
  grouped,
  selectedAttributes,
  quantities,
  handleQuantityChange,
  handleQuantityBlur,
  handleExtraPriceChange,
  handleExtraPriceBlur,
  handleAttributeChange,
  handleDelete,
  prices,
  handlePriceChange,
  handlePriceBlur,
  handleFlagChange,
  handleDescriptionUpdate,
}) => {
  // Локальний стан для модалки
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [descriptionDraft, setDescriptionDraft] = useState("");

  const { t } = useTranslation();

  const openModal = (product: Product) => {
    setCurrentProduct(product);
    setDescriptionDraft(product.description);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const saveDescription = () => {
    if (currentProduct) {
      handleDescriptionUpdate(currentProduct.slug, descriptionDraft);
      closeModal();
    }
  };

  return (
    <>
      <table border={1} cellPadding={8} className={styles.productsTable}>
        <thead>
          <tr>
            {titles.map((title) => (
              <th key={title}>{title}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Object.entries(grouped).map(([category, items]) => (
            <React.Fragment key={category}>
              <tr>
                <td colSpan={titles.length + 4} className={styles.category}>
                  {category}
                </td>
              </tr>

              {items.map((product) => {
                const attrValues = attributesTable(product);

                const selected = selectedAttributes[product.slug] ?? {
                  main: "",
                  secondary: "",
                  tertiary: "",
                };

                const { main, secondary, tertiary } = selected;

                const hasAttributes = attrValues.some((a) =>
                  a.values.some((v) => Boolean(v))
                );

                const key = hasAttributes
                  ? `${product.slug}_${main}_${secondary ?? ""}_${
                      tertiary ?? ""
                    }`
                  : product.slug;

                const qFromState = quantities[key]?.quantity;
                const quantity = qFromState ?? product.quantity;
                const extraPrice = quantities[key]?.extraPrice;

                return (
                  <tr key={product.slug}>
                    <td>{product.name}</td>

                    {/* PRICE INPUT */}
                    <td className={styles.center}>
                      <input
                        type="number"
                        min={0}
                        value={prices[product.slug] ?? product.price}
                        onChange={(e) =>
                          handlePriceChange(product.slug, e.target.value)
                        }
                        onBlur={() =>
                          handlePriceBlur(
                            product.slug,
                            prices[product.slug] ?? product.price
                          )
                        }
                        className={styles.quantity}
                      />

                      {isExtraPrice(key) && (
                        <input
                          type="number"
                          min={0}
                          value={extraPrice}
                          onChange={(e) =>
                            handleExtraPriceChange(key, e.target.value)
                          }
                          onBlur={() =>
                            handleExtraPriceBlur(
                              product.slug,
                              Number(extraPrice),
                              main,
                              secondary,
                              tertiary
                            )
                          }
                          className={styles.extraPrice}
                        />
                      )}
                    </td>

                    {/* QUANTITY */}
                    <td>
                      <input
                        type="number"
                        min={0}
                        value={quantity}
                        onChange={(e) =>
                          handleQuantityChange(key, e.target.value)
                        }
                        onBlur={() =>
                          handleQuantityBlur(
                            product.slug,
                            Number(quantity),
                            main,
                            secondary,
                            tertiary
                          )
                        }
                        className={styles.quantity}
                      />
                    </td>

                    {/* ATTRIBUTES */}
                    <td className={styles.attributes}>
                      <div>
                        {attrValues.map(({ title, attribute, values }) => (
                          <div key={title}>
                            <p>
                              <b>
                                {product.attributes?.[0]?.[attribute] || ""}
                              </b>
                            </p>

                            {values.map((val) =>
                              val ? (
                                <div key={val} className={styles.radioWrapper}>
                                  <label className={styles.radioLabel}>
                                    <input
                                      type="radio"
                                      name={`${product.slug}_${title}`}
                                      value={val}
                                      checked={selected[title] === val}
                                      onChange={() =>
                                        handleAttributeChange(
                                          product.slug,
                                          title,
                                          val
                                        )
                                      }
                                    />
                                    <span>{val}</span>
                                  </label>
                                </div>
                              ) : null
                            )}
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* DESCRIPTION */}
                    <td>
                      <button
                        onClick={() => openModal(product)}
                        className={styles.editDescriptionButton}
                      >
                        {t("product.editDescription")}
                      </button>
                    </td>

                    {/* FLAGS */}
                    <td className={styles.center}>
                      <input
                        type="checkbox"
                        checked={
                          (product.popularProduct &&
                            +product.popularProduct === 1) ||
                          false
                        }
                        onChange={(e) =>
                          handleFlagChange(
                            product.slug,
                            "popularProduct",
                            e.target.checked
                          )
                        }
                      />
                    </td>
                    <td className={styles.center}>
                      <input
                        type="checkbox"
                        checked={
                          (product.newProduct && +product.newProduct === 1) ||
                          false
                        }
                        onChange={(e) =>
                          handleFlagChange(
                            product.slug,
                            "newProduct",
                            e.target.checked
                          )
                        }
                      />
                    </td>

                    {/* DELETE */}
                    <td className={styles.actions}>
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

      {/* MODAL */}
      {isModalOpen && currentProduct && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>
              {t("product.editDescription")}: {currentProduct.name}
            </h3>
            <textarea
              value={descriptionDraft}
              onChange={(e) => setDescriptionDraft(e.target.value)}
              className={styles.modalTextarea}
            />
            <div className={styles.modalButtons}>
              <button onClick={saveDescription} className={styles.saveButton}>
                {t("save")}
              </button>
              <button onClick={closeModal} className={styles.cancelButton}>
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsTable;
