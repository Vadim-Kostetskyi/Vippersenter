import { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";

interface ProductListCardProps {
  slug: string;
  image: string;
  price: number;
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
    <Link to={`/product/${slug}`} className={styles.productListCard}>
      <div className={styles.imageBox}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.info}>
        <p>{name}</p>
        <p className={styles.price}>
          {price.toFixed(2)}
          {t("currency")}
        </p>
        <button>{t("goToProduct")}</button>
      </div>
    </Link>
  );
};

export default ProductListCard;
