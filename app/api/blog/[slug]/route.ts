import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//get article by slug
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  // get params
  const { slug } = params;
  try {
    const article = await prisma.artikel.findUnique({
      where: { slug },
    });
    if (!article) return NextResponse.json({ message: "Artikel tidak ditemukan" }, { status: 404 });
    return NextResponse.json(article, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}

//post
export async function POST(request: Request, { params }: { params: { slug: string } }) {
  const key = request.headers.get("commit-api-key");
  if (key === process.env.COMMIT_API_KEY) {
    try {
      const { slug } = params;
      const data = JSON.parse(await request.text());

      //update_at
      data.updated_at = new Date();

      await prisma.artikel.update({ where: { slug }, data });
      return NextResponse.json({ message: "sukses" }, { status: 200 });
    } catch (e) {
      return NextResponse.json(e, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: "API key tidak ditemukan" }, { status: 500 });
  }
}

//delete
export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  const key = request.headers.get("commit-api-key");
  if (key === process.env.COMMIT_API_KEY) {
    try {
      const { slug } = params;
      await prisma.artikel.delete({ where: { slug } });
      return NextResponse.json({ message: "Berhasil dihapus" }, { status: 200 });
    } catch (e) {
      return NextResponse.json(e, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: "API key tidak ditemukan" }, { status: 500 });
  }
}
