"use client";
import { useContext } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Button } from "@/app/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { DataDeleteContext } from "@/app/context/DataDeleteContext";

export type Anggota = {
  id: number;
  nama: string;
  fakultas: string;
  prodi: string;
  no_telp: string;
  email: string;
  alamat: string;
  angkatan: string;
  status: string;
};

export const columns: ColumnDef<Anggota>[] = [
  {
    accessorKey: "nama",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" />,
  },
  {
    accessorKey: "fakultas",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fakultas" />,
  },
  {
    accessorKey: "prodi",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Program Studi" />,
  },
  {
    accessorKey: "no_telp",
    header: ({ column }) => <DataTableColumnHeader column={column} title="No Telp" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "alamat",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Alamat" />,
  },
  {
    accessorKey: "angkatan",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Angkatan" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const anggota = row.original;
      const router = useRouter();
      const { idToDelete, setIdToDelete } = useContext<any>(DataDeleteContext);

      function onClickEdit(id: number) {
        router.push(`/database/edit/${id}`);
      }

      function onClickDelete(id: number) {
        setIdToDelete(id);
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
            <DropdownMenuItem onClick={() => onClickEdit(anggota.id)}>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <AlertDialogTrigger onClick={() => onClickDelete(anggota.id)}>Hapus</AlertDialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
