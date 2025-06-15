import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import CoreSwiper from "components/CoreSwiper";
import { Pagination } from "swiper/modules";
import { breakpoints } from "utils/constants";
import { useGetRandomProductsQuery } from "storeRedux/productsApi";
import { SwiperSlide } from "swiper/react";

const AlsoLike = () => {
  const { data: products, isLoading, error } = useGetRandomProductsQuery();
  const { t } = useTranslation();

  return (
    <div className={styles.alsoLike}>
      <h2 className={styles.title}>{t("youMayAlsoLike")}</h2>
      <CoreSwiper
        modules={[Pagination]}
        navigation={true}
        slidesPerView={2}
        breakpoints={breakpoints}
      >
        {products
          ? products.map(({ name, image, price, _id }) => (
              <SwiperSlide>
                <div className={styles.itemsWrapper}>
                  <picture>
                    <img src={image} alt={name} className={styles.image} />
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
            ))
          : null}
      </CoreSwiper>
    </div>
  );
};

export default AlsoLike;
