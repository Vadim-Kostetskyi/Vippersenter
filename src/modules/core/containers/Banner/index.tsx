import CoreSwiper from "components/CoreSwiper";
import React from "react";
import { SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { slides } from "./slides";
import "swiper/scss/pagination";
import styles from "./index.module.scss";

export interface SlidesProps {
  id: number;
  image: string;
  imageSmall: string;
  text: string;
}

const Banner = () => {
  return (
    <div className={styles.wrapper}>
      <CoreSwiper
        modules={[Pagination, Autoplay]}
        navigation={true}
        autoplay={{
          delay: 5000,
        }}
      >
        {slides.map(({ text, image, imageSmall, id }) => (
          <SwiperSlide key={id}>
            <div className={styles.itemsWrapper}>
              <picture>
                <source media="(max-width: 480px)" srcSet={imageSmall} />
                <img src={image} alt={text} className={styles.image} />
              </picture>
            </div>
          </SwiperSlide>
        ))}
      </CoreSwiper>
    </div>
  );
};

export default Banner;
