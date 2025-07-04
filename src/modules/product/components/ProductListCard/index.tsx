import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";

interface ProductListCardProps {
  slug: string;
  image: string;
  price: string;
  name: string;
}

const ProductListCard: FC<ProductListCardProps> = ({
  slug,
  image,
  name,
  price,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.productListCard}>
      <div className={styles.imageBox}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.info}>
        <p>{name}</p>
        <p className={styles.price}>
          {(+price).toFixed(2)}
          {t("currency")}
        </p>
        <a href={`/product/${slug}`}>{t("goToProduct")}</a>
      </div>
    </div>
  );
};

export default ProductListCard;
