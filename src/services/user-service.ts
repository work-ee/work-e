// ! TODO: Example service to fetch current user data should be replaced with actual implementation
export async function getCurrentUser() {
  const res = await fetch("/api/users/current");
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}
