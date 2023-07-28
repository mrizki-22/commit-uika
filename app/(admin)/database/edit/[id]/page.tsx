"use client";
import Link from "next/link";
import React, { useState, FormEventHandler } from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { BsFillDatabaseFill } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Anggota = {
  nama: string;
  fakultas: string;
  prodi: string;
  no_telp: string;
  email: string;
  alamat: string;
  angkatan: string;
  status: string;
};

async function getData(id: string) {
  try {
    const response = await axios.get(`/api/anggota/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Data tidak ditemukan");
  }
}

function Page({ params }: { params: { id: string } }) {
  // data fakultas, jurusan, angkatan, status
  const fakultas = ["Fakultas Keguruan dan Ilmu Pendidikan", "Fakultas Hukum", "Fakultas Ekonomi dan Bisnis", "Fakultas Agama Islam", "Fakultas Teknik dan Sains", "Fakultas Ilmu Kesehatan"];
  const jurusan = [
    ["Pendidikan Bahasa Inggris", "Pendidikan Luar Sekolah", "Teknologi Pendidikan", "Pendidikan Vokasional Desain Fashion", "Pendidikan Profesi Guru"],
    ["Ilmu Hukum"],
    ["Manajemen", "Akuntansi", "Bisnis Digital", "Perdagangan Internasional"],
    [
      "Hukum Keluarga Islam",
      "Pendidikan Agama Islam",
      "Komunikasi Penyiaran Islam",
      "Ekonomi Syariah",
      "Pendidikan Guru Madrasah Ibtidaiyah",
      "Bimbingan Konseling dan Pendidikan Islam",
      "Manajemen Haji dan Umrah",
      "Ilmu Al-Quran dan Tafsir",
    ],
    ["Teknik Sipil", "Teknik Mesin", "Teknik Elektro", "Teknik Informatika", "Sistem Informasi", "Rekayasa Pertanian dan Biosistem", "Ilmu Lingkungan"],
    ["Kesehatan Masyarakat", "Gizi"],
  ];
  const angkatan = ["2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"];
  const status = ["Anggota Muda", "Anggota Biasa", "Dewan Alumni", "Anggota Kehormatan"];
  const router = useRouter();
  const [selectJurusan, setSelectJurusan] = useState<string[]>([]);
  const [dataAnggota, setDataAnggota] = useState<Anggota>();
  const [loading, setLoading] = useState<boolean>(true);

  // get id
  const id = params.id;
  if (id === undefined) router.push("/database");

  if (loading) {
    getData(id)
      .then((data) => {
        setDataAnggota(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        router.push("/database");
      });
  }

  //create handleSelect function to display jurusan based on fakultas id
  const handleSelect = (e: any): void => {
    const selectElement = e.target;
    const selectedIndex = selectElement.selectedIndex;
    const selectedOption = selectElement.options[selectedIndex];
    const fakultasId = selectedOption.tabIndex;
    setSelectJurusan(jurusan[fakultasId]);
  };

  // create handle submit function
  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    //create form data typescript
    const formData = new FormData(e.target as HTMLFormElement);

    //avoid null value at fakultas
    const fakultasValue = formData.get("fakultas");
    const fakultas = fakultasValue !== null ? fakultasValue : "";

    //avoid null value at prodi
    const prodiValue = formData.get("prodi");
    const prodi = prodiValue !== null ? prodiValue : "";

    //avoid null value at angkatan
    const angkatanValue = formData.get("angkatan");
    const angkatan = angkatanValue !== null ? angkatanValue : "";

    //avoid null value at status
    const statusValue = formData.get("status");
    const status = statusValue !== null ? statusValue : "";

    try {
      const data: Anggota = {
        nama: formData.get("nama") as string,
        fakultas: fakultas as string,
        prodi: prodi as string,
        no_telp: formData.get("no_telp") as string,
        email: formData.get("email") as string,
        alamat: formData.get("alamat") as string,
        angkatan: angkatan as string,
        status: status as string,
      };
      const res = await axios.put(`/api/anggota/${id}`, data);

      if (res.status === 200) {
        toast.success("Data berhasil diedit");
        router.push("/database");
      }
    } catch (err) {
      toast.error("Data gagal diedit");
      console.log(err);
    }
  };

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
        <h1 className="font-semibold text-2xl">Edit Data Anggota</h1>
      </div>
      <div className="mt-5">
        <form onSubmit={handleSubmit}>
          <div className="flex md:flex-row flex-col w-full">
            <div className="flex flex-col space-y-2 w-full">
              {/* Nama lengkap */}
              <div className="form-control w-full px-2">
                <label className="label" htmlFor="nama">
                  <span className="label-text">Nama Lengkap:</span>
                </label>
                <input id="nama" name="nama" type="text" placeholder="Ketik disini" className="input border-base-content w-full" required value={dataAnggota?.nama} />
              </div>

              {/* Fakultas */}
              <div className="form-control w-full px-2">
                <label className="label" htmlFor="fakultas">
                  <span className="label-text">Fakultas:</span>
                </label>
                <select id="fakultas" name="fakultas" className="select border-base-content w-full" onChange={handleSelect}>
                  <option disabled selected>
                    {dataAnggota?.fakultas !== "" ? dataAnggota?.fakultas : "Pilih Fakultas"}
                  </option>
                  {fakultas.map((fakultas, index) => (
                    <option key={index} value={fakultas} tabIndex={index} selected={dataAnggota?.fakultas === fakultas ? true : false}>
                      {fakultas}
                    </option>
                  ))}
                </select>
              </div>

              {/* Prodi */}
              <div className="form-control w-full px-2">
                <label className="label" htmlFor="prodi">
                  <span className="label-text">Program Studi:</span>
                </label>
                <select id="prodi" name="prodi" className="select border-base-content w-full">
                  <option disabled selected value={""}>
                    {dataAnggota?.prodi !== "" ? dataAnggota?.prodi : "Pilih Prodi"}
                  </option>
                  {selectJurusan.map((jurusan, index) => (
                    <option key={index} value={jurusan} selected={dataAnggota?.prodi === jurusan ? true : false}>
                      {jurusan}
                    </option>
                  ))}
                </select>
              </div>
              {/* {No telp */}
              <div className="form-control w-full px-2">
                <label className="label" htmlFor="no_telp">
                  <span className="label-text">No Telp:</span>
                </label>
                <input id="no_telp" name="no_telp" type="number" placeholder="Ketik disini" className="input border-base-content w-full" value={dataAnggota?.no_telp} />
              </div>
            </div>

            <div className="flex flex-col w-full space-y-2">
              {/* email */}
              <div className="form-control w-full px-2">
                <label className="label" htmlFor="email">
                  <span className="label-text">Email:</span>
                </label>
                <input id="email" name="email" type="text" placeholder="Ketik disini" className="input border-base-content w-full" value={dataAnggota?.email} />
              </div>

              {/* alamat */}
              <div className="form-control w-full px-2">
                <label className="label" htmlFor="alamat">
                  <span className="label-text">Alamat:</span>
                </label>
                <input id="alamat" name="alamat" type="text" placeholder="Ketik disini" className="input border-base-content w-full" value={dataAnggota?.alamat} />
              </div>
              {/* angkatan */}
              <div className="form-control w-full px-2">
                <label className="label" htmlFor="angkatan">
                  <span className="label-text">Angkatan:</span>
                </label>
                <select id="angkatan" name="angkatan" className="select border-base-content w-full">
                  <option disabled selected>
                    {dataAnggota?.angkatan !== "" ? dataAnggota?.angkatan : "Pilih Tahun Angkatan"}
                  </option>
                  {angkatan.map((angkatan, index) => (
                    <option key={index} value={angkatan} selected={dataAnggota?.angkatan === angkatan ? true : false}>
                      {angkatan}
                    </option>
                  ))}
                </select>
              </div>
              {/* Status */}
              <div className="form-control w-full px-2">
                <label className="label" htmlFor="status">
                  <span className="label-text">Status Anggota:</span>
                </label>
                <select id="status" name="status" className="select border-base-content w-full">
                  <option disabled selected>
                    {dataAnggota?.status !== "" ? dataAnggota?.status : "Pilih Status Anggota"}
                  </option>
                  {status.map((status, index) => (
                    <option key={index} value={status} selected={dataAnggota?.status === status ? true : false}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="ml-2 mt-5 flex space-x-2">
            <Link href="/database" className="btn btn-outline btn-neutral">
              Batal
            </Link>
            <button className="btn btn-primary hover:scale-x-105" type="submit">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
