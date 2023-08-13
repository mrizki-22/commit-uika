import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//Create Anggota
export async function POST(request: Request) {
  const body = await request.json();

  try {
    await prisma.anggota.create({
      data: body,
    });
    return NextResponse.json({ message: "Data berhasil disimpan" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 500 });
  }
}

//Get All Anggota
export async function GET() {
  try {
    const data = await prisma.anggota.findMany();
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
