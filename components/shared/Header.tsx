import React from "react";

import Link from "next/link";

import { SignOut } from "@/components/auth/SignOut";
import { FlagUkrSvg } from "@/components/icons/FlagUkrSvg";
import { Button } from "@/components/ui";

import { auth } from "@/lib/auth";

export const Header = async () => {
  const session = await auth();

  // -> Add default values for first_name and avatar_url
  const { first_name, avatar_url } = session?.backendUser || {
    first_name: session?.user?.name || "Guest",
    avatar_url: session?.user?.image || null,
  };

  return (
    <header className="bg-primary-100 min-h-[94px] flex items-center justify-between py-4">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link href="/" className="logo heading-h2 text-primary-900">
            Work- E
          </Link>

          <div className="flex items-center gap-2">
            {!session ? (
              <div className="flex items-center gap-4">
                <Link href="sign-in">
                  <Button type="submit" variant="secondary">
                    Увійти
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button variant="secondary">Зареєструватись</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button className="flex items-center justify-center gap-2 hover:bg-secondary-100 rounded-full p-2 transition-colors cursor-pointer group">
                  <div className="flex justify-center items-center gap-2 outline outline-secondary-300 h-10 w-10 rounded-full overflow-hidden bg-accent-50 group-hover:outline-3 transition-all">
                    {avatar_url ? (
                      <>
                        <img src={`${avatar_url}`} alt="User Avatar" className="" />
                      </>
                    ) : (
                      <span className="heading-h3 flex-inline text-secondary-900">{first_name?.charAt(0)}</span>
                    )}
                  </div>
                  <span className="flex-initial">{first_name}</span>
                </button>
                <SignOut />
              </div>
            )}

            <ul className="ml-4 flex items-center gap-4 font-black text-primary-900">
              <li>
                <a href="#" className="flex items-center gap-2">
                  <i>
                    <FlagUkrSvg />
                  </i>
                  UA
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
