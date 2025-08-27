import { MatchingMain } from "@/components/matching";

import GetSession from "@/lib/auth/get-session";

export default async function MatchingPage() {
  const session = await GetSession();
  if (!session) {
    return (
      <main className="center-page">
        <h1 className="heading-h2">Please log in to access the onboarding process.</h1>
      </main>
    );
  }

  return (
    <main className="center-page">
      <MatchingMain />
    </main>
  );
}
