import { ProfileMain } from "@/components/profile";

import { getUser } from "@/lib/supabase/auth";

export default async function ProfilePage() {
  const user = await getUser();

  return (
    <main className="center-page">
      <section className="section flex-1">
        <div className="container">
          <div className="relative">
            <h1 className="heading-h2">Мій профіль</h1>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 italic">Welcome: </span>
              <span className="heading-h4 text-primary">{user?.user_metadata?.full_name || "User"}</span>
            </div>

            <div className="absolute top-0 right-0 flex flex-col items-end gap-2 p-2 text-base">
              <div className="mt-2 flex flex-col items-end justify-between gap-1">
                <div className="flex gap-2">
                  <span className="text-neutral-500">Дата останнього входу:</span>
                  <span className="text-neutral-800">
                    {new Date(user?.last_sign_in_at || "").toLocaleDateString("uk-UA")}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-neutral-500">Дата приєднання:</span>
                  <span className="text-neutral-800">
                    {new Date(user?.created_at || "").toLocaleDateString("uk-UA")}
                  </span>
                </div>
              </div>
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
