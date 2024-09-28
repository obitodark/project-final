"use client"

import { titleFont } from "@/config/fonts"
import { deleteRequest, getRequest } from "@/utils/http"
import { PlusIcon } from "@radix-ui/react-icons"
import { useDispatch } from "react-redux"
import { openModal } from "@/store/Modal"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DataTableCustom } from "@/components/custom/DataTableCustom"
import { Box } from "@/components/custom/Box"
import type { APIResponseCategory, Category } from "@/interface"
import { columnsCategory } from "../column/ColumnTableCategory"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export const TableCategory = () => {

  const dispatch = useDispatch();

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      return (await getRequest<APIResponseCategory>("/categories")).data?.result || [];
    },
  });

  return (
    <Box className="p-2 sm:p-5 bg-white shadow-xl shadow-stone-200 rounded-xl mt-3">
      <Box className="flex justify-between">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl `}>
          Lista Categorias
        </h1>
        <Button variant="ghost" className="mx-2 font-semibold"
          onClick={() => dispatch(openModal({ name: "modalCategory", data: undefined }))}
        >
          Nuevo
          <PlusIcon className="mx-2" />
        </Button>
      </Box>
      {categories && (
        <DataTableCustom columns={columnsCategory} data={categories} pageSize={5} />
      )}
    </Box>
  )
}

