import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";

interface ProductListCardProps {
  id: string;
  image: string;
  price: number;
  name: string;
}

const ProductListCard: FC<ProductListCardProps> = ({
  id,
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
          {price.toFixed(2)}
          {t("currency")}
        </p>
        <a href={`/product/${id}`}>{t("goToProduct")}</a>
      </div>
    </div>
  );
};

export default ProductListCard;
