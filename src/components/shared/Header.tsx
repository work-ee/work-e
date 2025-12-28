import Link from "next/link";

import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { SignInBtnClient } from "@/components/auth/SignBtnClient";

import { ROUTES } from "@/lib/constants";
import { getUser } from "@/lib/supabase/auth";

export const Header = async () => {
  const user = await getUser();

  return (
    <header className="bg-primary-100 sticky top-0 z-50 flex h-(--header-height) items-center justify-between py-4">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link href={ROUTES.home} className="logo heading-h2">
            work-<i>e</i>
          </Link>

          <div className="flex items-center gap-2">
            <SignInBtnClient user={user} />
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};
