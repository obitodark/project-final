"use client"
import type { APIResponseSearchProducts, Products } from "@/interface"

import { titleFont } from "@/config/fonts"
import { getRequest } from "@/utils/http"
import { PlusIcon } from "@radix-ui/react-icons"
import { useDispatch } from "react-redux"
import { openModal } from "@/store/Modal"
import { Button } from "@/components/ui/button"
import { columnsProducts } from "../column/ColumnTableProduct"
import { DataTableCustom } from "@/components/custom/DataTableCustom"
import { Box } from "@/components/custom/Box"
import { useQuery } from "@tanstack/react-query"



export const TableProducts = () => {

  const dispatch = useDispatch();

  const { data: products = [] } = useQuery<Products[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await getRequest<APIResponseSearchProducts>("/product/search");
      return response.data?.result.data || [];
    },

  });

  return (
    <Box className="p-2 sm:p-5 bg-white shadow-xl shadow-stone-200 rounded-xl mt-3">
      <Box className="flex justify-between">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl `}>
          Lista de Productos
        </h1>
        <Button variant="ghost" className="mx-2 font-semibold"
          onClick={() => dispatch(openModal({ name: "modalProduct", data: undefined }))}
        >
          Nuevo
          <PlusIcon className="mx-2" />
        </Button>
      </Box>
      {products && (
        <DataTableCustom columns={columnsProducts} data={products} pageSize={5} />
      )}
    </Box>
  )
}

