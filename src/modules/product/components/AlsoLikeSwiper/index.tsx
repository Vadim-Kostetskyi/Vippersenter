import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import CoreSwiper from "components/CoreSwiper";
import { Pagination } from "swiper/modules";
import { breakpoints } from "utils/constants";
import { useGetRandomProductsQuery } from "storeRedux/productsApi";
import { SwiperSlide } from "swiper/react";

const AlsoLikeSwiper = () => {
  const { data: products } = useGetRandomProductsQuery();
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
        {products &&
          products.map(({ name, image, price, slug }) => (
            <SwiperSlide key={slug}>
              <div className={styles.itemsWrapper}>
                <picture>
                  <img src={image} alt={name} className={styles.image} />
                </picture>
              </div>
              <div className={styles.info}>
                <p>{name}</p>
                <p className={styles.price}>
                  {Number(price).toFixed(2)}
                  {t("currency")}
                </p>
                <a href={`/product/${slug}`}>{t("goToProduct")}</a>
              </div>
            </SwiperSlide>
          ))}
      </CoreSwiper>
    </div>
  );
};

export default AlsoLikeSwiper;
