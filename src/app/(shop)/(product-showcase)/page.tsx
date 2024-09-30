"use client"
import React from "react";
import { Grid, PaginationBox } from "@/components/custom";
import { Box } from "@/components/custom/Box";
import { ProductGrid } from "@/components/features/product";
import { titleFont } from "@/config/fonts";
import type { APIResponseSearchProducts } from "@/interface";
import { getRequest } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";

interface Props {
  params: {
    id: string
  }
}

export default async function HomePage({ params }: Props) {
  const { id } = params;
  const decodedQueryString = decodeURIComponent(id);

  const { data: products = null } = useQuery<APIResponseSearchProducts>({
    queryKey: ['productsSearch'],
    queryFn: async () => {
      const response = await getRequest<APIResponseSearchProducts>(`/product/search?${decodedQueryString}`);
      return response.data || null;
    },

  });

  return (
    <>
      <Grid cols={{ xs: 12 }} className="flex justify-end">
        {products?.result?.data ? <PaginationBox page={products?.result?.totalPages} /> : ""}
      </Grid>
      {
        products?.result?.data
          ? <ProductGrid products={products?.result?.data} />
          : <Box className="flex flex-col justify-center items-center h-[500px]">
            <h4 className={`${titleFont.className} font-semibold text-xl
              `}>Sin Resultados </h4>
          </Box>
      }
      <Grid cols={{ xs: 12 }} className="flex justify-end">
        {products?.result?.data ? <PaginationBox page={products?.result?.totalPages} /> : ""}
      </Grid>
    </>
  );
}
