import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import LangLink from "utils/LangLink";
import CoreSwiper from "components/CoreSwiper";
import { breakpoints } from "utils/constants";
import { useGetRandomProductsQuery } from "storeRedux/productsApi";
import styles from "./index.module.scss";

const AlsoLikeSwiper = () => {
  const { productId } = useParams();
  const { data: products } = useGetRandomProductsQuery({
    slug: productId,
  });
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
              <LangLink to={`/product/${slug}`} className={styles.itemsWrapper}>
                <div>
                  <div>
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
                  </div>
                </div>
                <button>{t("goToProduct")}</button>
              </LangLink>
            </SwiperSlide>
          ))}
      </CoreSwiper>
    </div>
  );
};

export default AlsoLikeSwiper;
