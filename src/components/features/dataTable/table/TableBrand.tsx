"use client"

import { titleFont } from "@/config/fonts"
import { getRequest } from "@/utils/http"
import { PlusIcon } from "@radix-ui/react-icons"
import { useDispatch } from "react-redux"
import { openModal } from "@/store/Modal"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DataTableCustom } from "@/components/custom/DataTableCustom"
import { Box } from "@/components/custom/Box"
import type { APIResponseBrand, Brand } from "@/interface/brand.interface"
import { columnsBrand } from "../column/ColumnTableBrand"
import { useQuery } from "@tanstack/react-query"

export const TableBrand = () => {

  const dispatch = useDispatch();
  const { data: brands = [] } = useQuery<Brand[]>({
    queryKey: ['brands'],
    queryFn: async () => {
      return (await getRequest<APIResponseBrand>("/brands")).data?.result || [];
    },
  });
  return (
    <Box className="p-2 sm:p-5 bg-white shadow-xl shadow-stone-200 rounded-xl mt-3">
      <Box className="flex justify-between">
        <h4 className={`${titleFont.className} antialiased font-bold text-xl `}>
          Lista Marcas
        </h4>
        <Button variant="ghost" className="mx-2 font-semibold"
          onClick={() => dispatch(openModal({ name: "modalBrand", data: undefined }))} >
          Nuevo
          <PlusIcon className="mx-2" />
        </Button>
      </Box>
      {brands && (
        <DataTableCustom columns={columnsBrand} data={brands} pageSize={5} />
      )}
    </Box>
  )
}

