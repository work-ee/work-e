import { MatchingMain } from "@/components/matching";

import GetSession from "@/lib/auth/get-session";

export default async function MatchingPage() {
  const session = await GetSession();
  if (!session) {
    return (
      <main className="center-page">
        <section className="section">
          <div className="container text-center">
            <h1 className="heading-h2">Please Log in to access the matching process.</h1>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="center-page">
      <MatchingMain />
    </main>
  );
}
