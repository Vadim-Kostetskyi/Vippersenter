import CoreSwiper from "components/CoreSwiper";
import { SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { slides } from "./slides";
import "swiper/scss/pagination";
import styles from "./index.module.scss";

export interface SlidesProps {
  id: number;
  image: string;
  imageSmall?: string;
  text: string;
  price?: string;
}

const Banner = () => {

// const postalCode = "2670";

// fetch(
//   `http://localhost/vise-data-base/api/v1/order/posten/index.php?postalCode=${postalCode}`
// )
//   .then((res) => res.json())
//   .then((data) => {
//     if (data.error) {
//       console.warn(`Помилка: ${data.error} (код: ${data.status})`);
//       // alert("Вибачте, для цього поштового коду немає пунктів видачі.");
//       return;
//     }

//     console.log("Pickup points:", data);
//     // тут уже рендеримо список відділень
//   })
//   .catch((err) => {
//     console.error("Помилка мережі:", err);
//     // alert("Не вдалося отримати дані. Спробуйте пізніше.");
//   });
//   fetch(
//     "http://localhost/vise-data-base/api/v1/order/posten/post-offices.php?city=Bergen"
//   )
//     .then((res) => res.json())
//     .then((data) => console.log(data));

  return (
  <div className={styles.wrapper}>
    <CoreSwiper
      modules={[EffectFade, Autoplay]}
      autoHeight={true}
      navigation={true}
      autoplay={{
        delay: 5000,
      }}
      rewind={true}
    >
      {slides.map(({ text, image, imageSmall }) => (
        <SwiperSlide>
          <div className={styles.itemsWrapper}>
            <picture>
              <source media="(max-width: 960px)" srcSet={imageSmall} />
              <img src={image} alt={text} className={styles.image} />
            </picture>
          </div>
        </SwiperSlide>
      ))}
    </CoreSwiper>
  </div>
)};

export default Banner;
