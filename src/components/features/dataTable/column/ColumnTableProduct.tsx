"use client"
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import type { Products } from "@/interface";
import { DropdownMenuCustom } from "../../../custom";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRequest } from "@/utils/http";

export const columnsProducts: ColumnDef<Products>[] = [
  {
    accessorKey: "images",
    header: "Imagen",
    cell: ({ row }) => {

      return (
        <Image
          src={
            row.original.images[0]
              ? row.original.images[0].url
              : "/imgs/not_image.png"
          }
          width={40}
          height={40}
          alt='image'
          className='rounded-full object-cover w-[40px] h-[40px] border border-black'
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}  >
          Nombre
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize line-clamp-2">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => <div className="text-center col-span-2 text-sm line-clamp-2">{row.getValue("description")}</div>,
  },
  {
    accessorKey: "price",
    header: () => <div className="text-center ">Precio</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));

      const formattedPrice = new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
      }).format(price);
      return <div className="text-center font-semibold text-emerald-500">{formattedPrice}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: () => <div className="text-right">Stock</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("stock")}</div>,
  },
  {
    accessorKey: "brand.name",
    header: "Marca",
  },
  {
    accessorKey: "category.name",
    header: "Categoria",
  },
  {
    accessorKey: "subcategory.name",
    header: "Subcategoria",
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.original.id
      const dispatch = useDispatch();
      const queryClient = useQueryClient();

      const mutation = useMutation<any, Error, { idProduct: number | undefined }>({
        mutationFn: async ({ idProduct }) => {
          await deleteRequest<any>(`/product/${idProduct}`);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['products'] });
        },

      });

      const handlerDeleteProduct = (idProduct: number | undefined) => {
        mutation.mutate({ idProduct });
      };
      return (
        <>
          <DropdownMenuCustom label="Acciones" icon={<DotsHorizontalIcon className="h-4 w-4" />}>
            <DropdownMenuItem onClick={() => dispatch(openModal({ name: "modalProduct", value: "UPDATE", data: row.original }))}>Editar</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handlerDeleteProduct(id)}
            >
              Borrar</DropdownMenuItem>
          </DropdownMenuCustom>
        </>
      );
    },
  },
];
