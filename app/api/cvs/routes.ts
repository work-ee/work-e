import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/cvs/`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error fetching CVs");
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /api/cvs/ error:", err);
    return NextResponse.json(
      {
        message: "Не вдалося отримати список CV",
        internalError: process.env.NODE_ENV === "development" ? String(err) : undefined,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch(`${process.env.API_URL}/api/cvs/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error creating CV");
    }
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("POST /api/cvs/ error:", err);
    return NextResponse.json(
      {
        message: "Не вдалося створити CV",
        internalError: process.env.NODE_ENV === "development" ? String(err) : undefined,
      },
      { status: 500 }
    );
  }
}
