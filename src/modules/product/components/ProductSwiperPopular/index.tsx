import { SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import CoreSwiper from "components/CoreSwiper";
import { slides } from "./slides";
import { breakpoints } from "utils/constants";
import styles from "./index.module.scss";

const ProductSwiperPopular = () => {
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
        {slides.map(({ text, image, price }) => (
          <SwiperSlide>
            <div className={styles.itemsWrapper}>
              <picture>
                <img src={image} alt={text} className={styles.image} />
              </picture>
            </div>
            <div className={styles.info}>
              <p>{text}</p>
              <p className={styles.price}>{price}</p>
              <a href="#">{t("goToProduct")}</a>
            </div>
          </SwiperSlide>
        ))}
      </CoreSwiper>
    </div>
  );
};

export default ProductSwiperPopular;
