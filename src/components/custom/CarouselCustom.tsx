"use client"
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "../ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";


export interface Images {
  id?: number;
  name?: string;
  url: string;
}
interface Props {
  images: Images[];
  value?: number;
}

export const CarouselCustom = ({ images, value = 0 }: Props) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  useEffect(() => {
    if (api && value >= 0 && value < images.length) {
      api.scrollTo(value);
    }
  }, [value, api, images.length]);

  return (
    <Carousel setApi={setApi} className="w-full h-[550px] p-0 m-0 overflow-x-hidden">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="">
            <Card className="h-[550px]">
              <CardContent className="relative h-full p-0">
                <div className="relative w-full h-full">
                  <Image
                    src={image.url}
                    alt={`Slide ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="rounded-xl"
                  />
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="" />
      <CarouselNext />
    </Carousel>
  );
};
