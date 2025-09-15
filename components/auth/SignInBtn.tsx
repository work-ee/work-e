import Link from "next/link";

import { Button } from "@/components/ui";

import { auth } from "@/lib/auth";
import { ROUTES } from "@/lib/constants";
import { getUserDisplayInfo } from "@/lib/utils/user-utils";

import { SignOut } from "./SignOut";

export const SignInBtn = async () => {
  const session = await auth();

  if (!session) {
    return (
      <div className="flex items-center gap-4">
        <Link href={ROUTES.login}>
          <Button type="submit" variant="secondary" className="btn-sm">
            Увійти
          </Button>
        </Link>
        <Link href={ROUTES.register}>
          <Button variant="secondary" className="btn-sm">
            Зареєструватись
          </Button>
        </Link>
      </div>
    );
  }

  const { first_name, avatar_url } = await getUserDisplayInfo();

  return (
    <div className="flex items-center gap-4">
      <Link
        href={ROUTES.profile}
        className="hover:bg-secondary-100 group flex cursor-pointer items-center justify-center gap-2 rounded-full p-2 transition-colors"
      >
        <div className="outline-secondary-300 bg-accent-50 flex h-10 w-10 items-center justify-center gap-2 overflow-hidden rounded-full outline transition-all group-hover:outline-3">
          {avatar_url ? (
            <img src={`${avatar_url}`} alt="User Avatar" />
          ) : (
            <span className="heading-h3 flex-inline text-secondary-900">{first_name?.charAt(0)}</span>
          )}
        </div>
        <span className="flex-initial">{first_name}</span>
      </Link>
      <SignOut />
    </div>
  );
};
