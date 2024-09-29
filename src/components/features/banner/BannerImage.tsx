"use client"

import { CarouselCustom } from "../../custom";
export const images = [
  {
    url: "save_web_slide1_resize.webp",

  }, {
    url: "Main-Banner.webp",
  }
];


export const BannerImage = () => {
  return (
    <CarouselCustom images={images} />
  );
};
