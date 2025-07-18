import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProductCategoryModel from "modules/product/components/ProductCategoryModel";
import ProductListCategory from "../ProductListCategory";
import FilterButton from "modules/product/components/FilterButton";
import CategoryNames from "components/CategoryNames";
import { useGetProductsByCategoryQuery } from "storeRedux/productsApi";
import { images } from "./data";
import styles from "./index.module.scss";

type CategoryKey = keyof typeof images;

const ProductCategory = () => {
  const [attributes, setAttributes] = useState<Record<string, string[]>>({});
  const { t } = useTranslation();
  const { list } = CategoryNames(t);
  const { category } = useParams();
  if (!category || !(category in images)) return null;

  const categoryChosen = list.filter(({ key }) => key === category);
  const filters: Record<string, string[]> = { ...attributes };

  const { data: products } = useGetProductsByCategoryQuery({
    category: categoryChosen[0].label,
    filters,
  });

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
      console.log(newAttributes);
      

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
        <FilterButton filtration={onFiltrationAttributes} />
        <ProductListCategory products={products} />
      </div>
    </>
  );
};

export default ProductCategory;
