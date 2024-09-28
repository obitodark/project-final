"use client"

import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "../../ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CarouselCustom } from "../../custom";
import { url } from "inspector";



// Imágenes del carrusel
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
