import { SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
import CoreSwiper from "components/CoreSwiper";
import { slides } from "./slides";
import { breakpoints } from "utils/constants";
import styles from "./index.module.scss";

const ProductSwiperNewProducts = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <h1>{t("newProducts")}</h1>
      <CoreSwiper navigation={true} slidesPerView={2} breakpoints={breakpoints}>
        {slides.map(({ text, image, imageSmall, price }) => (
          <SwiperSlide>
            <div className={styles.itemsWrapper}>
              <picture>
                <source media="(max-width: 480px)" srcSet={imageSmall} />
                <img src={image} alt={text} className={styles.image} />
              </picture>
            </div>
            <div className={styles.info}>
              <p>{text}</p>
              <p className={styles.price}>{price}</p>
              <a href="#">Перейти на товар</a>
            </div>
          </SwiperSlide>
        ))}
      </CoreSwiper>
    </div>
  );
};

export default ProductSwiperNewProducts;
