"use client"
import type { Products } from "@/interface"
import { IconStart } from "../../custom"
import { CardImage } from "../../custom/CardImage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { useState } from "react"
import Link from "next/link"

interface Props {
  product: Products
}
export const ProductItem = ({ product }: Props) => {
  const initialImageUrl = product.images && product.images.length > 0
    ? product.images[0].url
    : '/imgs/not_image.png';
  const [displayImage, setDisplayImage] = useState(initialImageUrl);
  return (
    <Card className="p-0 bg-none border-2 border-gray-50 hover:border-gray-200 transition-all duration-300 ease-in-out"
      onMouseEnter={() => setDisplayImage(
        product.images != undefined
          ? product.images.length < 2
            ? displayImage
            : product.images[1].url
          : displayImage
      )}
      onMouseLeave={() =>
        setDisplayImage(product.images[0] ? product.images[0].url : displayImage)}
    >
      <CardContent className="p-0 border-none bg-none">
        <CardImage src={displayImage} />
      </CardContent>
      <CardHeader className=" p-1 sm:p-2">
        <CardTitle className="text-sm md:text-md">{product.brand.name}</CardTitle>
        <IconStart value={3} />
        <CardDescription className="hover:text-indigo-600 cursor-pointer line-clamp-2  text-gray-700">
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
        </CardDescription>
        <CardTitle>PEN {product.price}</CardTitle>
      </CardHeader>
    </Card>

  )
}

