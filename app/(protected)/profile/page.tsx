import { ProfileMain } from "@/components/profile";

import { fetchCurrentUserData } from "@/lib/utils/user";

export default async function ProfilePage() {
  const { userData, first_name, last_name } = await fetchCurrentUserData();

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
              <ProfileMain user={userData} />
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
