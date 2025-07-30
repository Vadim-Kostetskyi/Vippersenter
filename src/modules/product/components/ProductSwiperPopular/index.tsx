import { Link } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import CoreSwiper from "components/CoreSwiper";
import { breakpoints } from "utils/constants";
import { useGetProductsQuery } from "storeRedux/productsApi";
import styles from "./index.module.scss";

const ProductSwiperPopular = () => {
  const { data: popularProducts } = useGetProductsQuery({
    popularProduct: true,
  });
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <h1>{t("popularProducts")}</h1>
      <CoreSwiper
        modules={[Pagination]}
        navigation={true}
        slidesPerView={2}
        breakpoints={breakpoints}
      >
        {popularProducts &&
          popularProducts.map(({ name, image, price, slug }) => (
            <SwiperSlide>
              <div className={styles.itemsWrapper}>
                <div>
                  <div className={styles.imageWrapper}>
                    <picture>
                      <img src={image} alt="" className={styles.image} />
                    </picture>
                  </div>
                  <div className={styles.info}>
                    <p>{name}</p>
                    <p className={styles.price}>
                      {Number(price).toFixed(2)}
                      {t("currency")}
                    </p>
                  </div>
                </div>
                <Link to={`/product/${slug}`}>{t("goToProduct")}</Link>
              </div>
            </SwiperSlide>
          ))}
      </CoreSwiper>
    </div>
  );
};

export default ProductSwiperPopular;
