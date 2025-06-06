import React from "react";

import Link from "next/link";

import { SignOut } from "@/components/auth/SignOut";
import { Button } from "@/components/ui";

import { auth } from "@/lib/auth";

export const Header = async () => {
  const session = await auth();

  // console.log(session);

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
                    {session.user?.image ? (
                      <>
                        <img src={`${session.user?.image}`} alt="User Avatar" className="" />
                      </>
                    ) : (
                      <span className="heading-h3 flex-inline text-secondary-900">{session.user?.name?.charAt(0)}</span>
                    )}
                  </div>
                  <span className="flex-initial">{session.user?.name}</span>
                </button>
                <SignOut />
              </div>
            )}

            <ul className="ml-4 flex items-center gap-4 font-black text-primary-900">
              <li>
                <a href="#" className="flex items-center gap-2">
                  <i>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 31C24.3 31 31 24.3 31 16H1C1 24.3 7.7 31 16 31Z" fill="#FFE62E" />
                      <path d="M16 1C7.7 1 1 7.7 1 16H31C31 7.7 24.3 1 16 1Z" fill="#428BC1" />
                    </svg>
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
