export function getBaseUrl(request: Request) {
  const url = new URL(request.url);

  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";

  const isDev = process.env.NODE_ENV === "development";

  // local always origin
  if (isDev || !forwardedHost) {
    return url.origin;
  }

  // prod / preview (Netlify, Vercel, etc)
  return `${forwardedProto}://${forwardedHost}`;
}
