import { NextRequest, NextResponse } from "next/server";

import { CV } from "@/types/cvs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch(`${process.env.API_URL}/api/cvs/by-email/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Помилка отримання CV за email");
    }

    const data = (await res.json()) as CV[];
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("POST /api/cvs/by-email/ error:", error);
    return NextResponse.json({ message: "Не вдалося отримати CV за email" }, { status: 500 });
  }
}
