import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//create article
export async function POST(request: Request, { params }: { params: { slug: string } }) {
  // get params
  const { slug } = params;
  const key = request.headers.get("commit-api-key");
  if (key === process.env.COMMIT_API_KEY) {
    return NextResponse.json(slug, { status: 200 });
  } else {
    return NextResponse.json({ message: "Data gagal disimpan" }, { status: 500 });
  }
}
