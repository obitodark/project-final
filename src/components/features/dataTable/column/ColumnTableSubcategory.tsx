"use client"
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";

import { DropdownMenuCustom } from "../../../custom";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/Modal";
import type { Subcategory } from "@/interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRequest } from "@/utils/http";

export const columnsSubcategory: ColumnDef<Subcategory>[] = [
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
    accessorKey: "category.name",
    header: "Categoria",
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
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const mutationDelete = useMutation({
    mutationFn: async (idSubcategory: number) => {
      await deleteRequest<any>(`/subcategories/${idSubcategory}`, true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subcategories'] });
    },
  });
  const handlerDeleteSubcategory = () => {
    mutationDelete.mutate(id)
  }
  return (
    <>
      <DropdownMenuCustom label="Acciones" icon={<DotsHorizontalIcon className="h-4 w-4" />}>

        <DropdownMenuItem
          onClick={() => dispatch(openModal({ name: "modalSubcategory", value: "UPDATE", data: row.original }))}
        >Editar</DropdownMenuItem>
        <DropdownMenuItem
          onClick={handlerDeleteSubcategory}
        >Borrar</DropdownMenuItem>
      </DropdownMenuCustom>
    </>
  );
};
