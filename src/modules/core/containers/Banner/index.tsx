import CoreSwiper from "components/CoreSwiper";
import React from "react";
import { SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { slides } from "./slides";
import "swiper/scss/pagination";
import styles from "./index.module.scss";

export interface SlidesProps {
  id: number;
  image: string;
  imageSmall: string;
  text: string;
  price?: string;
}

const Banner = () => (
  <div className={styles.wrapper}>
    <CoreSwiper
      modules={[EffectFade, Autoplay]}
      navigation={true}
      autoplay={{
        delay: 5000,
      }}
      rewind={true}
    >
      {slides.map(({ text, image, imageSmall, id }) => (
        <SwiperSlide>
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

export default Banner;
