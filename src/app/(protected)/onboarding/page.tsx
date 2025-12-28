import { OnboardingMain } from "@/components/onboarding";

import { getAllJobs } from "@/lib/data/jobs";
import { getUser } from "@/lib/supabase/auth";

export default async function OnboardingPage() {
  const jobs = await getAllJobs();
  const user = await getUser();

  if (!user) {
    return (
      <main className="center-page">
        <h1 className="heading-h2">Please log in to access the onboarding process.</h1>
      </main>
    );
  }

  return (
    <main className="center-page">
      <OnboardingMain user={user} jobs={jobs} />
    </main>
  );
}
