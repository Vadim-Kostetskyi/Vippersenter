import { SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CoreSwiper from "components/CoreSwiper";
import { breakpoints } from "utils/constants";
import { useGetProductsQuery } from "storeRedux/productsApi";
import styles from "./index.module.scss";

const ProductSwiperNewProducts = () => {
  const { data: newProducts } = useGetProductsQuery({
    newProduct: true,
  });
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <h1>{t("newProducts")}</h1>
      <CoreSwiper navigation={true} slidesPerView={2} breakpoints={breakpoints}>
        {newProducts &&
          newProducts.map(({ name, image, price, slug }) => (
            <SwiperSlide>
              <Link to={`/product/${slug}`} className={styles.itemsWrapper}>
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
                <button>{t("goToProduct")}</button>
              </Link>
            </SwiperSlide>
          ))}
      </CoreSwiper>
    </div>
  );
};

export default ProductSwiperNewProducts;
