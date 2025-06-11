import { NextRequest, NextResponse } from "next/server";

import { CV } from "@/types/cvs";

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
    const data: CV[] = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /api/cvs/ error:", err);
    return NextResponse.json({ message: "Failed to fetch CVs", err }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    const email = formData.get("email") as string | null;
    const file = formData.get("cv_file") as File | null;

    if (!email || !file) {
      return NextResponse.json({ error: "Missing email or file" }, { status: 400 });
    }

    const backendFormData = new FormData();
    backendFormData.append("email", email);
    backendFormData.append("cv_file", file);

    const res = await fetch(`${process.env.API_URL}/api/cvs/`, {
      method: "POST",
      body: backendFormData,
    });

    const data = (await res.json()) as CV;

    return new NextResponse(JSON.stringify(data), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error uploading CV:", error);
    return NextResponse.json({ error: "Failed to upload CV" }, { status: 500 });
  }
}
