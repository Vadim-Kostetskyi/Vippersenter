import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProductsTable from "../ProductsTable";
import { Product, AttributeValue } from "storeRedux/types";
import { handleDeleteProduct } from "utils/product";
import {
  useDeleteProductMutation,
  useUpdateProductExtraPriceMutation,
  useUpdateProductPriceMutation,
  useUpdateProductQuantityMutation,
  useUpdateProductDescriptionMutation,
  useUpdateProductFlagsMutation,
} from "storeRedux/productsApi";

interface ProductsTableFunctional {
  products: Product[];
  grouped: Record<string, Product[]>;
}

const ProductsTableFunctional: FC<ProductsTableFunctional> = ({
  products,
  grouped,
}) => {
  const { t } = useTranslation();

  const [quantities, setQuantities] = useState<
    Record<
      string,
      {
        quantity: number;
        extraPrice: string;
      } & AttributeValue
    >
  >({});

  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, { main: string; secondary: string; tertiary: string }>
  >({});

  const [prices, setPrices] = useState<Record<string, number>>({});

  const [deleteProduct] = useDeleteProductMutation();
  const [updateQuantity] = useUpdateProductQuantityMutation();
  const [updateExtraPrice] = useUpdateProductExtraPriceMutation();
  const [updateProductPrice] = useUpdateProductPriceMutation();
  const [updateProductDescription] = useUpdateProductDescriptionMutation();

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

      setPrices((prev) => {
        const updated = { ...prev };
        products.forEach((product) => {
          if (!(product.slug in updated)) {
            updated[product.slug] = Number(product.price) || 0;
          }
        });
        return updated;
      });
    }
  }, [products]);

  const handleQuantityChange = (key: string, newQuantity: string) => {
    const num = newQuantity === "" ? 0 : Number(newQuantity);
    if (Number.isFinite(num) && num >= 0) {
      setQuantities((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          quantity: num,
        },
      }));
    }
  };

  const handleExtraPriceChange = (key: string, value: string) => {
    setQuantities((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        extraPrice: value,
      },
    }));
  };

  const handleQuantityBlur = async (
    productSlug: string,
    quantity: number,
    value_main: string,
    value_secondary?: string,
    value_tertiary?: string
  ) => {
    try {
      const payload: any = { slug: productSlug, quantity };
      if (value_main) payload.value_main = value_main;
      if (value_secondary) payload.value_secondary = value_secondary;
      if (value_tertiary) payload.value_tertiary = value_tertiary;

      await updateQuantity(payload).unwrap();
    } catch {
      alert(t("product.updateError") || "Error updating quantity");
    }
  };

  const handleExtraPriceBlur = async (
    productSlug: string,
    extraPrice: number,
    value_main: string,
    value_secondary?: string,
    value_tertiary?: string
  ) => {
    try {
      const payload: any = { slug: productSlug, extraPrice };
      if (value_main) payload.value_main = value_main;
      if (value_secondary) payload.value_secondary = value_secondary;
      if (value_tertiary) payload.value_tertiary = value_tertiary;

      await updateExtraPrice(payload).unwrap();
    } catch {
      alert(t("product.updateError") || "Error updating extra price");
    }
  };

  const handlePriceChange = (slug: string, price: string) => {
    const value = Number(price);
    if (!isNaN(value) && value >= 0) {
      setPrices((prev) => ({ ...prev, [slug]: value }));
    }
  };

  const handlePriceBlur = async (slug: string, price: number) => {
    try {
      await updateProductPrice({ slug, price }).unwrap();
    } catch {
      alert(t("product.updateError") || "Error updating price");
    }
  };

  const delProduct = async (id: string) => {
    await deleteProduct(id).unwrap();
  };

  const handleDelete = (id: string) => handleDeleteProduct(id, delProduct, t);

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

  // === Оновлення опису на сервері + перезавантаження сторінки ===
  const handleDescriptionUpdate = async (
    slug: string,
    newDescription: string
  ) => {
    try {
      await updateProductDescription({
        slug,
        description: newDescription,
      }).unwrap();
      window.location.reload(); // перезавантажуємо сторінку після успішного збереження
    } catch {
      alert("Error updating description");
    }
  };

  const [updateProductFlags] = useUpdateProductFlagsMutation();

  const handleFlagChange = async (
    slug: string,
    flag: "newProduct" | "popularProduct",
    value: boolean
  ) => {
    try {
      const flagValue = value ? 1 : 0;

      await updateProductFlags({ slug, [flag]: flagValue }).unwrap();
    } catch (err) {
      alert("Помилка при оновленні прапорця продукту");
      console.error(err);
    }
  };

  const titles = [
    t("product.title"),
    t("product.price"),
    t("product.quantity"),
    t("product.characteristics"),
    t("form.description"),
    t("popularProducts"),
    t("newProducts"),
    t("actions"),
  ];

  return (
    <ProductsTable
      titles={titles}
      grouped={grouped}
      selectedAttributes={selectedAttributes}
      quantities={quantities}
      handleQuantityChange={handleQuantityChange}
      handleQuantityBlur={handleQuantityBlur}
      handleExtraPriceChange={handleExtraPriceChange}
      handleExtraPriceBlur={handleExtraPriceBlur}
      handleAttributeChange={handleAttributeChange}
      handleDelete={handleDelete}
      prices={prices}
      handlePriceChange={handlePriceChange}
      handlePriceBlur={handlePriceBlur}
      handleFlagChange={handleFlagChange}
      handleDescriptionUpdate={handleDescriptionUpdate}
    />
  );
};

export default ProductsTableFunctional;
