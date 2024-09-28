

import { Grid, PaginationBox } from "../../custom";

import type { Products } from "@/interface";
import { ProductItem } from "./ProductItem";

interface Props {
  products?: Products[];
}

export const ProductGrid = ({ products }: Props) => {
  return (
    <>
      <h1 className=" ml-10 mt-5 text-2xl font-semibold">Lista Articulos</h1>
      <Grid container cols={{ xs: 2, sm: 3, md: 3, lg: 4 }} spacing={{ xs: 2 }} className="p-4 " >
        {
          products && products.map(product => (
            <ProductItem key={product.id} product={product} />
          ))
        }
      </Grid>

    </>
  )
}

