import { FC, ReactNode } from "react";
import { Swiper, SwiperProps } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import { Navigation } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/autoplay";
import "swiper/scss/effect-fade";

export type CoreSwiperProps = {
  children: ReactNode;
  modules?: SwiperProps["modules"];
  navigation?: SwiperProps["navigation"];
  pagination?: SwiperProps["pagination"];
  autoplay?: SwiperProps["autoplay"];
  slidesPerView?: number;
  rewind?: boolean;
  autoHeight?: boolean;
  breakpoints?:
    | {
        [width: number]: SwiperOptions;
        [ratio: string]: SwiperOptions;
      }
    | undefined;
};

const CoreSwiper: FC<CoreSwiperProps> = ({
  children,
  navigation,
  modules,
  pagination,
  autoplay,
  slidesPerView = 1,
  rewind = false,
  breakpoints,
  autoHeight,
}) => (
  <Swiper
    modules={[Navigation, ...(modules || [])]}
    slidesPerView={slidesPerView}
    spaceBetween={10}
    pagination={pagination}
    navigation={navigation}
    autoplay={autoplay}
    autoHeight={autoHeight}
    effect="fade"
    fadeEffect={{ crossFade: true }}
    rewind={rewind}
    watchOverflow={true}
    breakpoints={breakpoints}
  >
    {children}
  </Swiper>
);

export default CoreSwiper;
