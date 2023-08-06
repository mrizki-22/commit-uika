"use client";
import { useContext } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Button } from "@/app/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { DataIdContext } from "@/app/context/DataIdContext";
import Link from "next/link";

export type Artikel = {
  id: number;
  judul: string;
  slug: string;
  penulis: string;
  // konten: string;
  kategori: string;
  is_published: boolean;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
};

export const columns: ColumnDef<Artikel>[] = [
  {
    accessorKey: "judul",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Judul" />,
  },
  {
    accessorKey: "penulis",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Penulis" />,
  },
  {
    accessorKey: "kategori",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Kategori" />,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created at" />,
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Terakhir diedit" />,
  },
  {
    accessorKey: "published_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Diterbitkan" />,
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const artikel = row.original;
      const { dataId, setDataId } = useContext<any>(DataIdContext);

      function onClickDelete(id: number) {
        setDataId(id);
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 z-50">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-base-100">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link className="w-full" href={`/database/edit/${artikel.id}`}>
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <AlertDialogTrigger className="w-full text-left" onClick={() => onClickDelete(artikel.id)}>
                Hapus
              </AlertDialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
