import ClientOnboarding from "@/components/onboarding/ClientOnboarding";

import GetSession from "@/lib/get-session";

export default async function OnboardingPage() {
  const session = await GetSession();
  return (
    <main className="center-page">
      <ClientOnboarding user={session?.user} />
    </main>
  );
}
