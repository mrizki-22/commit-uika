"use client";
import { useContext } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Button } from "@/app/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from "@/app/components/ui/dropdown-menu";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { DataIdContext } from "@/app/context/DataIdContext";
import Link from "next/link";
import { MdPublish, MdUnpublished } from "react-icons/md";

export type Artikel = {
  id: number;
  judul: string;
  slug: string;
  penulis: string;
  is_published: boolean;
  published_at: String;
  created_at: String;
  updated_at: String;
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
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Dibuat pada" />,
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
      const { action, setAction } = useContext<any>(DataIdContext);

      function onClickAction(slug: string, action: string) {
        setDataId(slug);
        setAction(action);
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
              {!artikel.is_published ? (
                <AlertDialogTrigger className="w-full text-left flex items-center space-x-2" onClick={() => onClickAction(artikel.slug, "publish")}>
                  <p>Publish</p>
                  <MdPublish className="inline-block w-4 h-4 mr-2 stroke-current" />
                </AlertDialogTrigger>
              ) : (
                <AlertDialogTrigger className="w-full text-left flex items-center space-x-2" onClick={() => onClickAction(artikel.slug, "unpublish")}>
                  <p>Cancel Publish</p>
                  <MdUnpublished className="inline-block w-4 h-4 mr-2 stroke-current" />
                </AlertDialogTrigger>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled={artikel.is_published ? true : false}>
              <Link className="w-full" href={`/admin-blog/${artikel.slug}`}>
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <AlertDialogTrigger className="w-full text-left" onClick={() => onClickAction(artikel.slug, "delete")}>
                Hapus
              </AlertDialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
