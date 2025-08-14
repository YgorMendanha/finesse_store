import { NextResponse } from "next/server";
import prisma from "~/prisma/client";

function verifyAuth(request: Request) {
  const auth = request.headers.get("Authentication");
  if (!auth) return false;
  const token = Buffer.from(auth.split(" ")[1] ?? "", "base64").toString(
    "utf8"
  );
  return token === process.env.NEXT_PUBLIC_TOKEN;
}

export async function POST(request: Request) {
  if (!verifyAuth(request))
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  try {
    const data = await prisma.cart.create({ data: {} });
    return NextResponse.json(
      { data: { id: data.id }, code: "201" },
      { status: 201 }
    );
  } catch (error: any) {
    if (error?.code === "P2002")
      return NextResponse.json(
        { code: "P2002", message: error.meta?.target },
        { status: 400 }
      );
    return NextResponse.json(
      { code: "ERROR", message: error?.message ?? "unknown" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  if (!verifyAuth(request))
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const idParam = searchParams.get("id");
  if (!idParam)
    return NextResponse.json({ message: "id required" }, { status: 400 });
  const id = Number(idParam);
  if (Number.isNaN(id))
    return NextResponse.json({ message: "invalid id" }, { status: 400 });

  try {
    const data = await request.json();
    const response = await prisma.cart.update({ where: { id }, data });
    return NextResponse.json({ data: response, code: "200" }, { status: 200 });
  } catch (error: any) {
    if (error?.code === "P2002")
      return NextResponse.json(
        { code: "P2002", message: error.meta?.target },
        { status: 400 }
      );
    if (error?.code === "P2025")
      return NextResponse.json(
        { code: "P2025", message: error.meta?.cause },
        { status: 400 }
      );
    return NextResponse.json(
      { code: "ERROR", message: error?.message ?? "unknown" },
      { status: 500 }
    );
  }
}
