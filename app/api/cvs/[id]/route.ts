import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/cvs/${params.id}/`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error fetching CV by id");
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(`GET /api/cvs/${params.id}/ error:`, err);
    return NextResponse.json(
      {
        message: "Не вдалося отримати CV",
        internalError: process.env.NODE_ENV === "development" ? String(err) : undefined,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const pathSegments = url.pathname.split("/");
  const id = pathSegments[pathSegments.length - 1];

  if (!id) {
    return NextResponse.json({ message: "CV ID is missing" }, { status: 400 });
  }

  try {
    const res = await fetch(`${process.env.API_URL}/api/cvs/${id}/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error deleting CV");
    }

    return NextResponse.json({ message: "CV deleted successfully" });
  } catch (err) {
    console.error(`DELETE /api/cvs/${id} error:`, err);
    return NextResponse.json(
      {
        message: "Не вдалося видалити CV",
        internalError: process.env.NODE_ENV === "development" ? String(err) : undefined,
      },
      { status: 500 }
    );
  }
}
