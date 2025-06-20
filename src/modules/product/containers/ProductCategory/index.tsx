import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProductCategoryModel from "modules/product/components/ProductCategoryModel";
import ProductListCategory from "../ProductListCategory";
import FilterButton from "modules/product/components/FilterButton";
import CategoryNames from "components/CategoryNames";
import { useGetProductsQuery } from "storeRedux/productsApi";
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

  const { data } = useGetProductsQuery({
    category: categoryChosen[0].label,
    attributes,
  });

  console.log(attributes);

  console.log(data);

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

  console.log(data);

  return (
    <>
      <ProductCategoryModel
        image={images[category as CategoryKey]}
        category={category}
      />
      <div className={styles.productWrapper}>
        <FilterButton filtration={onFiltrationAttributes} />
        <ProductListCategory products={data} />
      </div>
    </>
  );
};

export default ProductCategory;
