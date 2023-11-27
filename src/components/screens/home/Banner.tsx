import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useQuery } from "@tanstack/react-query";
import { BannerApi } from "@/lib/api/banner.api";
import Image from "next/image";
import { Constants } from "@/lib/constants";

export interface BannerProps {}

const Banner: FC<BannerProps> = () => {
  const { data: banners } = useQuery({
    queryKey: [""],
    queryFn: BannerApi.getBanners,
  });
  return (
    <div className={"bg-white box"}>
      <Swiper
        className=" h-[300px] nb:h-[500px]  "
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={false}
        pagination={{
          clickable: true,
          // el: 'swiper-pagination',
          type: "bullets",
          bulletElement: "span",
          bulletClass: "pag-icon",
          bulletActiveClass: "pag-active",
          renderBullet: function (index, className) {
            return (
              '<span class="' +
              className +
              '"><span class="dott"></span>' +
              "</span>"
            );
          },
        }}
        loop={false}
        slidesOffsetAfter={0}
        slidesOffsetBefore={0}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        {banners?.data.data.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Image
              src={Constants.fileApi + banner.photo.id}
              alt={banner.name}
              width={500}
              height={500}
              className={"w-full h-full nb:h-[500px] object-contain"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
