import { NextRequest, NextResponse } from "next/server";

import { fetchCurrentUserData } from "@/lib/utils/user";

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "0.0.0.0";
  const acceptLang = req.headers.get("accept-language")?.split(",")[0] || "";

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";

  let city = "";
  let country = "";
  try {
    const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
    const geo = await geoRes.json();
    city = geo.city || "";
    country = geo.country || "";
  } catch (e) {
    console.error("Geo fetch failed:", e);
  }

  let userData = {};
  try {
    userData = await fetchCurrentUserData();
  } catch (e) {
    console.error("Failed to fetch current user data:", e);
  }

  return NextResponse.json({
    ip,
    city,
    country,
    language: acceptLang,
    timezone,
    ...userData,
  });
}
