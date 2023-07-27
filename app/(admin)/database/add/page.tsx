import Link from "next/link";
import React from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { BsFillDatabaseFill } from "react-icons/bs";
import { MdAdd } from "react-icons/md";

function Page() {
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
          <li>
            <Link className="flex items-center" href={"/database/add"}>
              <MdAdd className="inline-block w-4 h-4 mr-2 stroke-current" />
              <span className="leading-none">Tambah</span>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h1 className="font-semibold text-2xl">Tambah Data Anggota</h1>
      </div>
    </div>
  );
}

export default Page;
