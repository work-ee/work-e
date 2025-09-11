import React, { Suspense } from "react";

import Link from "next/link";

// import { SignInBtn } from "@/components/auth/SignInBtn";
import { SignInBtnClient } from "@/components/auth/SignInBtnClient";
import { FlagUkrSvg } from "@/components/icons";

import { ROUTES } from "@/lib/constants";

export const Header = async () => {
  return (
    <header className="bg-primary-100 sticky top-0 z-50 flex h-[var(--header-height)] items-center justify-between py-4">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link href={ROUTES.home} className="logo heading-h2 text-primary-900">
            Work- E
          </Link>

          <div className="flex items-center gap-2">
            <Suspense fallback={<div className="h-10 w-20 animate-pulse rounded bg-gray-200" />}>
              {/* <SignInBtn /> */}
              <SignInBtnClient />
            </Suspense>

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
