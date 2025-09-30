import { ProfileMain } from "@/components/profile";

import { GetCachedAuth } from "@/lib/auth/get-session";
import { getCurrentUserData } from "@/lib/utils/user-utils";

export default async function ProfilePage() {
  const session = await GetCachedAuth();

  if (!session) {
    throw new Error("User not authenticated");
  }

  const { user, first_name, last_name } = await getCurrentUserData();

  return (
    <main className="center-page">
      <section className="section flex-1">
        <div className="container">
          <div className="relative">
            <h1 className="heading-h2">Мій профіль</h1>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 italic">Welcome: </span>
              <span className="heading-h4 text-primary">
                {first_name} {last_name}
              </span>
            </div>
          </div>

          <div className="aside-wrapper">
            <article className="article">
              <ProfileMain user={user} />
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
