import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import slugify from "slugify";
import moment from "moment";
import "moment/locale/id";

moment.locale("id");

// create article template
export async function POST(request: Request) {
  const key = request.headers.get("commit-api-key");
  if (key === process.env.COMMIT_API_KEY) {
    try {
      const article = await prisma.artikel.create({ data: {} });
      const data = {
        judul: `Commit Article ${article.id}`,
        slug: slugify(`Commit Article ${article.id}`, { lower: true }),
      };
      await prisma.artikel.update({ where: { id: article.id }, data });
      return NextResponse.json(data, { status: 201 });
    } catch (e) {
      return NextResponse.json(e, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: "API key tidak ditemukan" }, { status: 500 });
  }
}

// get all blog without content for blog admin table
export async function GET() {
  try {
    const articles = await prisma.artikel.findMany({
      select: {
        id: true,
        judul: true,
        slug: true,
        penulis: true,
        created_at: true,
        updated_at: true,
        is_published: true,
        published_at: true,
      },
      orderBy: { created_at: "desc" },
    });

    const data = articles.map((article) => {
      return {
        ...article,
        updated_at: moment(article.updated_at).format("DD MMMM YYYY HH:mm:ss"),
        created_at: moment(article.created_at).format("DD MMMM YYYY HH:mm:ss"),
        published_at: article.published_at === null ? "-" : moment(article.published_at).format("DD MMMM YYYY HH:mm:ss"),
      };
    });

    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
