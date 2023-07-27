import { Anggota, columns } from "./columns";
import { DataTable } from "./data-table";
import { BiSolidDashboard } from "react-icons/bi";
import { BsFillDatabaseFill } from "react-icons/bs";
import Link from "next/link";

async function getData(): Promise<Anggota[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      nama: "Muhammad Rizky Saputra",
      fakultas: "Fakultas Ilmu Komputer",
      prodi: "Teknik Informatika",
      no_telp: "081234567890",
      email: "abc@gmail.com",
      alamat: "Jl. Raya ITS RT03/01 Kel Badak Agung Kec. Sukarame Bandar Lampung",
      angkatan: 2019,
      status: "Anggota Biasa",
    },
  ];
}

export default async function Page() {
  const data = await getData();

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
