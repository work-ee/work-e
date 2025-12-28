"use client";

import type { User } from "@supabase/supabase-js";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";

import { useTranslations } from "next-intl";

import { SignOut } from "@/components/auth/SignOut";
import { Button } from "@/components/ui";

import { ROUTES } from "@/lib/constants";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

interface SignInBtnClientProps {
  user: User | null;
}

export const SignInBtnClient = ({ user }: SignInBtnClientProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(user);

  const t = useTranslations();

  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase]);

  const { first_name, avatar_url } = useMemo(() => {
    const firstName = currentUser?.user_metadata?.first_name || currentUser?.user_metadata?.name || "Guest";
    const avatarUrl = currentUser?.user_metadata?.avatar_url || currentUser?.user_metadata?.picture || null;

    return { first_name: firstName, avatar_url: avatarUrl };
  }, [
    currentUser?.user_metadata?.first_name,
    currentUser?.user_metadata?.avatar_url,
    currentUser?.user_metadata?.name,
    currentUser?.user_metadata?.picture,
  ]);

  if (!currentUser) {
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

      <div className="flex justify-center">
        <SignOut className="btn-sm">{t("signOut")}</SignOut>
      </div>
    </div>
  );
};
