import React, { FC, ReactNode } from 'react';
import { Swiper, SwiperProps } from 'swiper/react';
import { Navigation, EffectFade } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';
import 'swiper/scss/effect-fade';

export type CoreSwiperProps = {
  children: ReactNode;
  modules?: SwiperProps['modules'];
  navigation?: SwiperProps['navigation'];
  pagination?: SwiperProps['pagination'];
  autoplay?: SwiperProps['autoplay'];
};

const CoreSwiper: FC<CoreSwiperProps> = ({
  children,
  navigation,
  modules,
  pagination,
  autoplay,
}) => (
  <Swiper
    modules={[Navigation, EffectFade, ...(modules || [])]}
    slidesPerView={1}
    pagination={pagination}
    navigation={navigation}
    autoplay={autoplay}
    effect="fade"
    fadeEffect={{ crossFade: true }}
    rewind
  >
    {children}
  </Swiper>
);

export default CoreSwiper;
