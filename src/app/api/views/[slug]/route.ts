import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  const views = (await redis.get<number>(`views:${slug}`)) ?? 0;
  return NextResponse.json({ views });
}

export async function POST(_req: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  const views = await redis.incr(`views:${slug}`);
  return NextResponse.json({ views });
}
