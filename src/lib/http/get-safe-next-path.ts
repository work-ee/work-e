export function getSafeNextPath(searchParams: URLSearchParams, fallback = "/") {
  const next = searchParams.get("next");

  if (!next) return fallback;
  if (!next.startsWith("/")) return fallback;

  return next;
}
