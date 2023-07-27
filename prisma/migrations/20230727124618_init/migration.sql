-- CreateTable
CREATE TABLE "Anggota" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "fakultas" TEXT NOT NULL,
    "prodi" TEXT NOT NULL,
    "no_telp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "angkatan" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Anggota_pkey" PRIMARY KEY ("id")
);
