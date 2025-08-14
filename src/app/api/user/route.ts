import { NextResponse } from "next/server";
import prisma from "~/prisma/client";

function checkAuth(request: Request) {
  const auth = request.headers.get("Authentication") ?? "";
  const tokenEncoded = auth.split(" ")[1] ?? "";
  const token =
    typeof Buffer !== "undefined"
      ? Buffer.from(tokenEncoded, "base64").toString("utf8")
      : typeof atob !== "undefined"
      ? atob(tokenEncoded)
      : "";
  return token === process.env.NEXT_PUBLIC_TOKEN;
}

export async function POST(request: Request) {
  if (!checkAuth(request))
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  const payload: {
    name: string;
    email: string;
    password: string;
    cellphone: string;
  } = await request.json();

  const { name, email, password } = payload;
  if (!name || !email || !password)
    return NextResponse.json({ message: "Invalid Payload" }, { status: 400 });

  try {
    const data = await prisma.user.create({ data: payload });
    return NextResponse.json(
      {
        data: {
          id: data.id,
          name: data.name,
          email: data.email,
          cellphone: data.cellphone,
        },
        code: "201",
      },
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

export async function GET(request: Request) {
  if (!checkAuth(request))
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email") ?? "";
  const password = searchParams.get("password") ?? "";

  if (!email || !password)
    return NextResponse.json({ message: "Invalid Payload" }, { status: 400 });

  try {
    const data = await prisma.user.findUnique({ where: { email } });
    if (!data || data.password !== password)
      return NextResponse.json(
        { code: "401", message: "Invalid Password" },
        { status: 401 }
      );
    return NextResponse.json(
      {
        data: {
          id: data.id,
          name: data.name,
          email: data.email,
          cellphone: data.cellphone,
        },
        code: "200",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { code: "ERROR", message: error?.message ?? "unknown" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  if (!checkAuth(request))
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const idParam = searchParams.get("id");
  if (!idParam)
    return NextResponse.json({ message: "id required" }, { status: 400 });
  const id = Number(idParam);
  if (Number.isNaN(id))
    return NextResponse.json({ message: "invalid id" }, { status: 400 });

  const payload: {
    name?: string;
    email?: string;
    oldpassword?: string;
    newpassword?: string;
    cellphone?: string;
  } = await request.json();

  const { name, email, oldpassword = "", newpassword = "" } = payload;
  if (!name || !email)
    return NextResponse.json({ message: "Invalid Payload" }, { status: 400 });

  try {
    const dataToUpdate: any = { ...payload };
    if (newpassword && oldpassword) {
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user || user.password !== oldpassword)
        return NextResponse.json(
          { code: "401", message: "Invalid Password" },
          { status: 401 }
        );
      dataToUpdate.password = newpassword;
    }
    delete dataToUpdate.oldpassword;
    delete dataToUpdate.newpassword;

    const response = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });
    return NextResponse.json(
      {
        data: {
          id: response.id,
          name: response.name,
          email: response.email,
          cellphone: response.cellphone,
        },
        code: "200",
      },
      { status: 200 }
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
