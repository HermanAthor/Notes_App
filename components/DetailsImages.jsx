"use client";

import { useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { AspectRatio } from "@mui/joy";

const DetailsImages = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="container">
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="h-96 w-full rounded-lg"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="flex h-full w-full items-center justify-center">
              <img
                src={image.url}
                alt={image}
                className="block h-full w-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail */}
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={12}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="thumbs mt-3 h-32 w-full rounded-lg"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            {/* <button className="flex h-full w-full items-center justify-center"> */}
            <AspectRatio>
              <img
                src={image.url}
                alt={image}
                className="block h-full w-full object-cover"
              />
            </AspectRatio>
            {/* </button> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DetailsImages;
