"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Button } from "@/app/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// };

export type Anggota = {
  id: number;
  nama: string;
  fakultas: string;
  prodi: string;
  no_telp: string;
  email: string;
  alamat: string;
  angkatan: number;
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
              <Link href={`/database/edit/${anggota.id}`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/database/edit/${anggota.id}`}>Hapus</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
