"use client";

import React from "react";

// import Image from "next/image";
import Link from "next/link";

import { SignOut } from "@/components/auth/SignOut";
import { Button } from "@/components/ui";

// import { LogoutButton } from "@/components/ui/LogoutButton";

import { useAuth } from "@/hooks/useAuth";

export const Header = () => {
  const { user, isLoggedIn } = useAuth();

  return (
    <header className="bg-primary-100 min-h-[94px] flex items-center justify-between py-4">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link href="/" className="logo heading-h2 text-primary-900">
            Work- E
          </Link>
          <div className="flex items-center gap-2">
            {!isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link href="/sign-in">
                  <Button type="button" variant="secondary">
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
                    {user?.avatar_url ? (
                      <img
                        src={user?.avatar_url}
                        alt="User Avatar"
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <span className="heading-h3 text-secondary-900">{user?.first_name?.charAt(0)}</span>
                    )}
                  </div>
                  <span className="flex-initial">{user?.first_name}</span>
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
