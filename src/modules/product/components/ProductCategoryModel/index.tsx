import { FC } from "react";
import styles from "./index.module.scss";
import FilterButton from "../FilterButton";
import { useTranslation } from "react-i18next";

interface ProductCategoryModelProps {
  image: string;
  category: string;
}

const ProductCategoryModel: FC<ProductCategoryModelProps> = ({
  image,
  category,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.topContainer}>
        <img src={image} alt="" />
        <h1>{t(`categories.${category}`)}</h1>
      </div>
    </>
  );
};

export default ProductCategoryModel;
