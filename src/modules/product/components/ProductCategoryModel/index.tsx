import { FC } from "react";
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";

interface ProductCategoryModelProps {
  image?: string;
  category?: string;
}

const ProductCategoryModel: FC<ProductCategoryModelProps> = ({
  image,
  category,
}) => {
  const { t } = useTranslation();

  const title = category ? t(`categories.${category}`) : t(`catalog`);

  return (
    <>
      <div className={styles.topContainer}>
        {image ? (
          <div>
            <img src={image} alt="" />
          </div>
        ) : (
          <></>
        )}
        <h1>{title}</h1>
      </div>
    </>
  );
};

export default ProductCategoryModel;
