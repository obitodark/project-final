import type { ImageProduct } from "@/interface";
import Image from "next/image";
import type { ButtonHTMLAttributes } from "react";


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  indexcurrent: number;
  image: ImageProduct;
  index: number;
}
export const Thumbnailimage = ({ image, indexcurrent, index, ...props }: Props) => {
  return (
    <button {...props} className={`  bg-gray-400 rounded-full w-2 h-2 md:w-[90px] md:h-[90px] md:rounded-md overflow-clip ${indexcurrent == index ? "bg-indigo-600 md:bg-gray-400" : "bg-gray-400"} `}>
      <Image src={`${image.url}`} height={100} width={100} alt='image-' className={`hidden md:block rounded-md ${indexcurrent == index ? "opacity-30" : ""}`} />
    </button>
  )
}

