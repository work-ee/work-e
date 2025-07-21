import { Profile } from "@/components/profile/Profile";

import GetSession from "@/lib/auth/get-session";

export default async function ProfilePage() {
  const session = await GetSession();

  const { first_name, last_name } = session?.backendUser || {
    first_name: "Guest",
    last_name: "User",
  };

  return (
    <main className="center-page">
      <section className="section flex-1">
        <div className="container flex flex-col gap-8">
          <div>
            <h1 className="heading-h2">Мій профіль</h1>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 italic">Welcome: </span>
              <span className="heading-h4 text-primary">
                {first_name} {last_name}
              </span>
            </div>
          </div>

          <div className="max-w-[870px]">
            <Profile user={session?.backendUser} />
          </div>
        </div>
      </section>
    </main>
  );
}
