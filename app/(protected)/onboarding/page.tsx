import ClientOnboarding from "@/components/onboarding/ClientOnboarding";

import GetSession from "@/lib/auth/get-session";

import { getAllJobs } from "@/actions/server/jobs";

export default async function OnboardingPage() {
  const session = await GetSession();
  const jobs = await getAllJobs();

  if (!session) {
    return (
      <main className="center-page">
        <h1 className="heading-h2">Please log in to access the onboarding process.</h1>
      </main>
    );
  }
  return (
    <main className="center-page">
      <ClientOnboarding user={session?.user} jobs={jobs} />
    </main>
  );
}
