import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  const likes = (await redis.get<number>(`likes:${slug}`)) ?? 0;
  return NextResponse.json({ likes });
}

export async function POST(_req: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  const likes = await redis.incr(`likes:${slug}`);
  return NextResponse.json({ likes });
}
