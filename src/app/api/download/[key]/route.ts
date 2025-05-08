import { NextRequest, NextResponse } from "next/server";
import { getDownloadUrl } from "@/lib/s3";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.redirect("/login");

  // Verify user actually owns the product (simplified)
  const hasOrder = await prisma.order.findFirst({
    where: {
      email: session?.user?.email!,
      items: { some: { productId: key } },
    },
  });
  if (!hasOrder)
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const url = await getDownloadUrl(key);
  return NextResponse.redirect(url);
}
