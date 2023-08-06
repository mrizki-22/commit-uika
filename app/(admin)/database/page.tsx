"use client";
import { useState } from "react";
import { Anggota, columns } from "./columns";
import { DataTable } from "./data-table";
import { BiSolidDashboard } from "react-icons/bi";
import { BsFillDatabaseFill } from "react-icons/bs";
import Link from "next/link";
import axios from "axios";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/app/components/ui/alert-dialog";
import { DataIdContext } from "@/app/context/DataIdContext";
import React from "react";
import { toast } from "react-toastify";

async function getData(): Promise<Anggota[]> {
  try {
    const response = await axios.get(`/api/anggota`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default function Page() {
  const [data, setData] = useState<Anggota[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { dataId } = React.useContext<any>(DataIdContext);

  if (loading) {
    getData().then((data) => {
      setData(data);
      setLoading(false);
    });
  }

  async function handleDelete(id: number) {
    //axios
    try {
      const res = await axios.delete(`/api/anggota/${id}`);
      //if status code 200
      if (res.status == 200) {
        toast.success("Data berhasil dihapus");
        //set timeout 1s
        setTimeout(() => {
          setLoading(true);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Data gagal dihapus");
    }
  }

  return (
    <div className="container mx-auto">
      <div className="text-xs breadcrumbs">
        <ul>
          <li>
            <Link className="flex items-center" href={"/dashboard"}>
              <BiSolidDashboard className="inline-block w-4 h-4 mr-2 stroke-current" />
              <span className="leading-none">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link className="flex items-center" href={"/database"}>
              <BsFillDatabaseFill className="inline-block w-4 h-4 mr-2 stroke-current" />
              <span className="leading-none">Database</span>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h1 className="font-semibold text-2xl">Database Anggota</h1>
      </div>
      <div className="mt-5">
        <AlertDialog>
          {/* Table */}
          <DataTable columns={columns} data={data} />
          {/* End Table */}
          <AlertDialogContent className="bg-base-100">
            <AlertDialogHeader>
              <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
              <AlertDialogDescription>Data akan dihapus secara permanen dari database</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction className="bg-error hover:bg-red-500" onClick={() => handleDelete(dataId)}>
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
