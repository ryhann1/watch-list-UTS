import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const films = await prisma.film.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(films);
}