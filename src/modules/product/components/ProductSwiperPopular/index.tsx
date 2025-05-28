import { SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import CoreSwiper from "components/CoreSwiper";
import styles from "./index.module.scss";
import { slides } from "./slides";

const ProductSwiperPopular = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <h1>{t("popularProducts")}</h1>
      <CoreSwiper
        modules={[Pagination]}
        navigation={true}
        autoplay={{
          delay: 5000,
        }}
        slidesPerView={2}
      >
        {slides.map(({ text, image, imageSmall, id, price }) => (
          <SwiperSlide key={id}>
            <div className={styles.itemsWrapper}>
              <picture>
                <source media="(max-width: 480px)" srcSet={imageSmall} />
                <img src={image} alt={text} className={styles.image} />
              </picture>
            </div>
            <div className={styles.info}>
              <p>{text}</p>
              <p>{price}</p>
              <a href="#">Перейти на товар</a>
            </div>
          </SwiperSlide>
        ))}
      </CoreSwiper>
    </div>
  );
};

export default ProductSwiperPopular;
