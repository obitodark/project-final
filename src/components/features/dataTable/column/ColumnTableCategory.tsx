"use client"
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import type { APIResponseCategory, Category, Products } from "@/interface";
import { DropdownMenuCustom } from "../../../custom";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/Modal";
import { deleteRequest } from "@/utils/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const columnsCategory: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "Id",
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
    accessorKey: "status",
    header: "Estado",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];

const ActionsCell = ({ row }: { row: any }) => {
  const id = row.original.id;
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const mutationDelete = useMutation({
    mutationFn: async (idCategory: number) => {
      await deleteRequest<any>(`/categories/${idCategory}`, true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
  const deleteCategories = () => {
    mutationDelete.mutate(id)
  }
  return (
    <DropdownMenuCustom label="Acciones" icon={<DotsHorizontalIcon className="h-4 w-4" />}>
      <DropdownMenuItem
        onClick={() => dispatch(openModal({ name: "modalCategory", value: "UPDATE", data: row.original }))}
      >Editar</DropdownMenuItem>
      <DropdownMenuItem
        onClick={deleteCategories}
      >Borrar</DropdownMenuItem>
    </DropdownMenuCustom>
  );
};
