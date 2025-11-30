import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useTranslation } from "react-i18next";
import ProductCategoryModel from "modules/product/components/ProductCategoryModel";
import ProductListCategory from "../ProductListCategory";
import FilterButton from "modules/product/components/FilterButton";
import { useGetProductsByCategoryQuery } from "storeRedux/productsApi";
import { images } from "./data";
import styles from "./index.module.scss";
import { Product } from "storeRedux/types";

type CategoryKey = keyof typeof images;

const ProductCategory = () => {
  const [attributes, setAttributes] = useState<Record<string, string[]>>({});
  const [productsFirFilter, setProductsFirFilter] = useState<Product[]>([]);

  // const { t } = useTranslation();
  const { category } = useParams();
  if (!category || !(category in images)) return null;

  const filters: Record<string, string[]> = { ...attributes };
  const filtersQuantity = Object.keys(filters).length;

  const formattedCategory = category
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());

  const { data: products } = useGetProductsByCategoryQuery({
    category: formattedCategory,
    filters,
  });

  useEffect(() => {
    if (products && !filtersQuantity) {
      setProductsFirFilter(products);
    }
  }, [products, !filtersQuantity]);

  const onFiltrationAttributes = (
    attributeName: string,
    value: string,
    checked: boolean
  ) => {
    setAttributes((prev) => {
      const prevValues = prev[attributeName] || [];

      const newValues = checked
        ? [...prevValues, value]
        : prevValues.filter((v) => v !== value);

      const newAttributes = { ...prev };

      if (newValues.length > 0) {
        newAttributes[attributeName] = newValues;
      } else {
        delete newAttributes[attributeName];
      }

      return newAttributes;
    });
  };

  return (
    <>
      <ProductCategoryModel
        image={images[category as CategoryKey]}
        category={category}
      />
      <div className={styles.productWrapper}>
        <FilterButton
          filtration={onFiltrationAttributes}
          products={productsFirFilter}
        />
        <ProductListCategory products={products} />
      </div>
    </>
  );
};

export default ProductCategory;
