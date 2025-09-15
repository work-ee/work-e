"use client";

import { useMemo } from "react";

import Link from "next/link";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui";

import { ROUTES } from "@/lib/constants";

import { SignOut } from "./SignOut";

export const SignInBtnClient = () => {
  const { data: session, status } = useSession();
  const t = useTranslations();

  const { first_name, avatar_url } = useMemo(() => {
    const firstName = session?.backendUser?.first_name || session?.user?.name || "Guest";
    const avatarUrl = session?.backendUser?.avatar_url || session?.user?.image || null;

    return { first_name: firstName, avatar_url: avatarUrl };
  }, [session?.backendUser?.first_name, session?.backendUser?.avatar_url, session?.user?.name, session?.user?.image]);

  if (status === "loading" && session) {
    return (
      <div className="flex items-center gap-4">
        <div className="h-8 w-16 animate-pulse rounded bg-gray-200"></div>
        <div className="h-8 w-24 animate-pulse rounded bg-gray-200"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center gap-4">
        <Link href={ROUTES.login}>
          <Button type="submit" variant="secondary" className="btn-sm">
            {t("signIn")}
          </Button>
        </Link>
        <Link href={ROUTES.register}>
          <Button variant="secondary" className="btn-sm">
            {t("register")}
          </Button>
        </Link>
      </div>
    );
  }

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
      <SignOut>{t("signOut")}</SignOut>
    </div>
  );
};
