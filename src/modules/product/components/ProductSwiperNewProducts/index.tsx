import { SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
import CoreSwiper from "components/CoreSwiper";
import { breakpoints } from "utils/constants";
import { useGetProductsQuery } from "storeRedux/productsApi";
import styles from "./index.module.scss";

const ProductSwiperNewProducts = () => {
  const { data: popularProducts } = useGetProductsQuery({
    newProduct: true,
  });
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <h1>{t("newProducts")}</h1>
      <CoreSwiper navigation={true} slidesPerView={2} breakpoints={breakpoints}>
        {popularProducts &&
          popularProducts.map(({ name, image, price, _id }) => (
            <SwiperSlide>
              <div className={styles.itemsWrapper}>
                <picture>
                  <img src={image} alt="" className={styles.image} />
                </picture>
              </div>
              <div className={styles.info}>
                <p>{name}</p>
                <p className={styles.price}>
                  {price.toFixed(2)}
                  {t("currency")}
                </p>
                <a href={`/product/${_id}`}>{t("goToProduct")}</a>
              </div>
            </SwiperSlide>
          ))}
      </CoreSwiper>
    </div>
  );
};

export default ProductSwiperNewProducts;
