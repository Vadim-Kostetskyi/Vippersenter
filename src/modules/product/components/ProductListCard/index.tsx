import { FC } from "react";
import LangLink from "utils/LangLink";
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
    <LangLink to={`/product/${slug}`} className={styles.productListCard}>
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
    </LangLink>
  );
};

export default ProductListCard;
