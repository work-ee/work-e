import { NextRequest, NextResponse } from "next/server";

import { CV } from "@/types/cvs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body?.email) {
      return NextResponse.json({ message: "Email є обов’язковим" }, { status: 400 });
    }

    const res = await fetch(`${process.env.API_URL}/api/cvs/by-email/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.status === 404 || res.status === 204) {
      return NextResponse.json([], { status: 200 });
    }

    if (res.ok) {
      const data = (await res.json()) as CV[];
      return NextResponse.json(data, { status: 200 });
    }

    const error = await res.json();
    console.error("Error from external API for /api/cvs/by-email/:", error);

    return NextResponse.json(
      { message: error.message || "Помилка отримання CV за email від зовнішнього API" },
      { status: res.status }
    );
  } catch (error) {
    console.error("POST /api/cvs/by-email/ Next.js API route error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ message: "Не вдалося отримати CV за email" }, { status: 500 });
  }
}
