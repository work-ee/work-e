import React from "react";

import Link from "next/link";

import { SignOut } from "@/components/auth/SignOut";
import { FlagUkrSvg } from "@/components/icons";
import { Button } from "@/components/ui";

import { fetchCurrentUserData } from "@/lib/utils/user";

export const Header = async () => {
  const { session, first_name, avatar_url } = await fetchCurrentUserData();

  return (
    <header className="bg-primary-100 sticky top-0 z-50 flex h-[var(--header-height)] items-center justify-between py-4">
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
                <Link
                  href="/profile"
                  className="hover:bg-secondary-100 group flex cursor-pointer items-center justify-center gap-2 rounded-full p-2 transition-colors"
                >
                  <div className="outline-secondary-300 bg-accent-50 flex h-10 w-10 items-center justify-center gap-2 overflow-hidden rounded-full outline transition-all group-hover:outline-3">
                    {avatar_url ? (
                      <>
                        <img src={`${avatar_url}`} alt="User Avatar" className="" />
                      </>
                    ) : (
                      <span className="heading-h3 flex-inline text-secondary-900">{first_name?.charAt(0)}</span>
                    )}
                  </div>
                  <span className="flex-initial">{first_name}</span>
                </Link>
                <SignOut />
              </div>
            )}

            <ul className="text-primary-900 ml-4 flex items-center gap-4 font-black">
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
