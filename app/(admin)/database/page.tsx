"use client";
import { useState } from "react";
import { Anggota, columns } from "./columns";
import { DataTable } from "./data-table";
import { BiSolidDashboard } from "react-icons/bi";
import { BsFillDatabaseFill } from "react-icons/bs";
import Link from "next/link";
import axios from "axios";

async function getData(): Promise<Anggota[]> {
  try {
    const response = await axios.get(`/api/anggota`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function Page() {
  const [data, setData] = useState<Anggota[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  if (loading) {
    getData().then((data) => {
      setData(data);
      setLoading(false);
    });
  }

  // const data = await getData();

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
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
