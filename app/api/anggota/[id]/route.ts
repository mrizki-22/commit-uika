import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get anggota by id
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  try {
    const idAnggota = parseInt(id);
    const data = await prisma.anggota.findUnique({
      where: {
        id: idAnggota,
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 500 });
  }
}

// update anggota by id
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const body = await request.json();
  try {
    const idAnggota = parseInt(id);
    const data = await prisma.anggota.update({
      where: {
        id: idAnggota,
      },
      data: body,
    });
    return NextResponse.json("Success", { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 500 });
  }
}

// delete anggota by id
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  try {
    const idAnggota = parseInt(id);
    const data = await prisma.anggota.delete({
      where: {
        id: idAnggota,
      },
    });
    return NextResponse.json("Success", { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 500 });
  }
}
