import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import moment from "moment";
import "moment/locale/id";

moment.locale("id");

//get all published article
export async function GET() {
  try {
    const articles = await prisma.artikel.findMany({
      select: {
        id: true,
        judul: true,
        slug: true,
        penulis: true,
        cover_img: true,
        cover_img_url: true,
        published_at: true,
      },
      where: {
        is_published: true,
      },
      orderBy: {
        published_at: "desc",
      },
    });
    const data = articles.map((article) => {
      return {
        ...article,
        published_at: moment(article.published_at).format("DD MMMM YYYY"),
      };
    });

    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
