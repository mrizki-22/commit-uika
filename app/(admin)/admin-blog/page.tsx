"use client";
import { useState } from "react";
import { Artikel, columns } from "./columns";
import { DataTable } from "./data-table";
import { BiSolidDashboard } from "react-icons/bi";
import { BiLogoBlogger } from "react-icons/bi";
import Link from "next/link";
import axios from "axios";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/app/components/ui/alert-dialog";
import { DataIdContext } from "@/app/context/DataIdContext";
import React from "react";
import { toast } from "react-toastify";
import ModalDialog from "@/app/components/ModalDialog";

async function getData(): Promise<Artikel[]> {
  try {
    const response = await axios.get(`/api/blog`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default function Page() {
  const [data, setData] = useState<Artikel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { dataId, action } = React.useContext<any>(DataIdContext);
  const commitApiKey = process.env.NEXT_PUBLIC_COMMIT_API_KEY;

  if (loading) {
    getData().then((data) => {
      setData(data);
      setLoading(false);
    });
  }

  async function handleDelete(slug: string) {
    try {
      const res = await axios.delete(`/api/blog/${slug}`, {
        headers: {
          "commit-api-key": commitApiKey,
        },
      });
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

  async function handlePublish(slug: string) {
    try {
      const res = await axios.post(
        `/api/blog/${slug}/publish`,
        {},
        {
          headers: {
            "commit-api-key": commitApiKey,
          },
        }
      );
      //if status code 200
      if (res.status == 200) {
        toast.success("Artikel berhasil dipublikasi");
        //set timeout 1s
        setTimeout(() => {
          setLoading(true);
        }, 1000);
      }
    } catch (e) {
      console.log(e);
      toast.error("Artikel gagal dipublikasi");
    }
  }

  async function handleUnpublish(slug: string) {
    try {
      const res = await axios.post(
        `/api/blog/${slug}/publish`,
        {},
        {
          headers: {
            "commit-api-key": commitApiKey,
          },
        }
      );
      //if status code 200
      if (res.status == 200) {
        toast.success("Berhasil membatalkan publikasi");
        //set timeout 1s
        setTimeout(() => {
          setLoading(true);
        }, 1000);
      }
    } catch (e) {
      console.log(e);
      toast.error("Gagal membatalkan publikasi");
    }
  }

  var modalDialogProps = {
    title: "",
    description: "",
    action: "",
    btn: "danger",
    onAction: function () {},
  };
  //set modal dialog props
  if (action == "delete") {
    modalDialogProps = {
      title: "Hapus Artikel",
      description: "Apakah anda yakin?",
      action: "Hapus",
      btn: "danger",
      onAction: () => handleDelete(dataId),
    };
  } else if (action == "publish") {
    modalDialogProps = {
      title: "Publish Artikel",
      description: "Apakah anda yakin?",
      action: "Publish",
      btn: "info",
      onAction: () => handlePublish(dataId),
    };
  } else if (action == "unpublish") {
    modalDialogProps = {
      title: "Batalkan Publikasi Artikel",
      description: "Apakah anda yakin?",
      action: "Unpublish",
      btn: "info",
      onAction: () => handleUnpublish(dataId),
    };
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
            <Link className="flex items-center" href={"/admin-blog"}>
              <BiLogoBlogger className="inline-block w-4 h-4 mr-2 stroke-current" />
              <span className="leading-none">Blog</span>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h1 className="font-semibold text-2xl">Blog Admin</h1>
      </div>
      <div className="mt-5">
        <ModalDialog title={modalDialogProps.title} description={modalDialogProps.description} action={modalDialogProps.action} btn={modalDialogProps.btn == "danger" ? "danger" : "info"} onAction={modalDialogProps.onAction}>
          <DataTable columns={columns} data={data} />
        </ModalDialog>
      </div>
    </div>
  );
}
