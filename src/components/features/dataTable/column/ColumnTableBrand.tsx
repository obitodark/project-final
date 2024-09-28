"use client"
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import type { Brand, Category, Products } from "@/interface";
import { DropdownMenuCustom } from "../../../custom";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/Modal";

export const columnsBrand: ColumnDef<Brand>[] = [
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
  const dispatch = useDispatch();
  const id = row.original.id;

  return (
    <DropdownMenuCustom label="Acciones" icon={<DotsHorizontalIcon className="h-4 w-4" />}>
      <DropdownMenuItem
        onClick={() => dispatch(openModal({ name: "modalBrand", value: "UPDATE", data: row.original }))}
      >
        Editar
      </DropdownMenuItem>
      <DropdownMenuItem>Borrar</DropdownMenuItem>
    </DropdownMenuCustom>
  );
};
