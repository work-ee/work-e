import Link from "next/link";
import { redirect } from "next/navigation";

import { GoogleSignIn } from "@/components/auth/GoogleSignIn";
import { LinkedinSignIn } from "@/components/auth/LinkedinSignIn";

import { auth } from "@/lib/auth";

const Page = async () => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <main className="center-page">
      <section className="section">
        <div className="container">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col text-center">
              <h1 className="heading-h2">Увійти на Work - E</h1>
            </div>

            <div className="flex flex-col gap-2 text-center">
              <GoogleSignIn />
              <LinkedinSignIn />
            </div>

            <p>
              <Link href="/sign-up" className="text-link font-rubik font-medium">
                зареєструватись
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
