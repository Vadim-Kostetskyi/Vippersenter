import { SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import CoreSwiper from "components/CoreSwiper";
import { breakpoints } from "utils/constants";
import styles from "./index.module.scss";
import { useGetProductsQuery } from "storeRedux/productsApi";
import { useEffect } from "react";

const ProductSwiperPopular = () => {
  const { data: popularProducts } = useGetProductsQuery({
    popularProduct: true,
  });
  const { t } = useTranslation();

useEffect(() => {
  const fetchShipping = async () => {
    try {
      const res = await fetch(
        "http://localhost/vise-data-base/api/v1/order/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fromPostalCode: "0150",
            toPostalCode: "5000",
            countryCode: "NO",
            weightKg: 1.2,
            lengthCm: 30,
            widthCm: 20,
            heightCm: 10,
          }),
        }
      );

      const data = await res.json();
      console.log("Response:", data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  fetchShipping();
}, []);

  


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
                <a href={`/product/${slug}`}>{t("goToProduct")}</a>
              </div>
            </SwiperSlide>
          ))}
      </CoreSwiper>
    </div>
  );
};

export default ProductSwiperPopular;
