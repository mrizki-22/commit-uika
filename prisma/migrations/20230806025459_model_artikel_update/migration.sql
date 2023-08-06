/*
  Warnings:

  - You are about to drop the column `kategori_id` on the `Artikel` table. All the data in the column will be lost.
  - You are about to drop the `Kategori` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Artikel" DROP CONSTRAINT "Artikel_kategori_id_fkey";

-- AlterTable
ALTER TABLE "Artikel" DROP COLUMN "kategori_id",
ALTER COLUMN "judul" DROP NOT NULL,
ALTER COLUMN "slug" DROP NOT NULL;

-- DropTable
DROP TABLE "Kategori";
