import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// update is_published to opposite value (publishing and unpublishing article)
export async function POST(request: Request, { params }: { params: { slug: string } }) {
  const key = request.headers.get("commit-api-key");
  if (key === process.env.COMMIT_API_KEY) {
    try {
      const { slug } = params;
      const data = await prisma.artikel.findUnique({
        where: {
          slug: slug,
        },
      });
      if (data) {
        const { is_published } = data;
        if (!is_published) {
          const newData = await prisma.artikel.update({
            where: {
              slug: slug,
            },
            data: {
              is_published: true,
              published_at: new Date(),
            },
          });
          return NextResponse.json({ message: "Sukses mempublikasi" }, { status: 200 });
        } else {
          const newData = await prisma.artikel.update({
            where: {
              slug: slug,
            },
            data: {
              is_published: false,
              published_at: null,
            },
          });
          return NextResponse.json({ message: "Sukses membatalkan publikasi" }, { status: 200 });
        }
      } else {
        return NextResponse.json({ message: "Artikel tidak ditemukan" }, { status: 404 });
      }
    } catch (e) {
      return NextResponse.json(e, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: "API key tidak ditemukan" }, { status: 500 });
  }
}
