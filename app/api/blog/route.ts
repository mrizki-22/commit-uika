import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const key = request.headers.get("commit-api-key");
  if (key === process.env.COMMIT_API_KEY) {
    try {
      const article = await prisma.artikel.create({ data: {} });
      const data = {
        judul: `Commit Article ${article.id}`,
        slug: slugify(`Commit Article ${article.id}`, { lower: true }),
      };
      return NextResponse.json(data, { status: 201 });
    } catch (e) {
      return NextResponse.json(e, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: "API key tidak ditemukan" }, { status: 500 });
  }
}
