"use client";

import type { User } from "@supabase/supabase-js";

import { useActionState, useEffect, useState } from "react";

import { AlertInfo } from "@/components/feedback";
import { ProfileActions, ProfileData, ProfileSettings, ProfileTabs } from "@/components/profile";
import type { ToggleName } from "@/components/profile/ProfileSettings";
import { TabsContent } from "@/components/ui/shadcn/tabs";

import { type UserState, updateUserProfile } from "@/app/_actions/profile";

export function ProfileMain({ user }: { user: User | null }) {
  const { email, last_sign_in_at, created_at } = user || {};
  const { full_name, avatar_url } = user?.user_metadata || {};
  // const { provider, providers } = user?.app_metadata || {};

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [toggleStates, setToggleStates] = useState<{
    [key in ToggleName]: boolean;
  }>({
    autoSendCV: false,
    autoCompareJobs: false,
    emailNotifications: true,
  });

  const formState: UserState = {
    first_name: full_name?.split(" ")[0] || "",
    last_name: full_name?.split(" ")[1] || "",
    email: email || "",
    avatar_url: avatar_url || "",
    linkedin_url: "",
    cv: "",
    errors: {},
  };

  const updateUserWithId = updateUserProfile.bind(null, user?.id || "");
  const [state, formAction] = useActionState(updateUserWithId, formState);

  const handleToggle = (name: ToggleName) => {
    setToggleStates((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleAlertClose = (toggleName: ToggleName) => {
    setToggleStates((prev) => ({
      ...prev,
      [toggleName]: false,
    }));
  };

  useEffect(() => {
    if (state.success) {
      setMessage({ type: "success", text: "Профіль успішно оновлено!" });
    } else if (state.errors && Object.keys(state.errors).length > 0) {
      setMessage({ type: "error", text: state.errors._general || "Будь ласка, виправте помилки у формі" });
    }
  }, [state]);

  return (
    <ProfileTabs>
      <form className="flex flex-col gap-6" action={formAction} noValidate>
        <TabsContent
          value="profile"
          className="data-[state=active]:animate-in data-[state=active]:fade-in data-[state=active]:zoom-in data-[state=inactive]:animate-fade-out data-[state=inactive]:fade-out data-[state=inactive]:zoom-out"
        >
          <ProfileData state={state} lastSignInAt={last_sign_in_at} dataJoined={created_at} />
        </TabsContent>

        <TabsContent
          value="settings"
          className="data-[state=active]:animate-in data-[state=active]:fade-in data-[state=active]:zoom-in data-[state=inactive]:animate-fade-out data-[state=inactive]:fade-out data-[state=inactive]:zoom-out"
        >
          <ProfileSettings handleToggle={handleToggle} toggleStates={toggleStates} />
        </TabsContent>
        <ProfileActions message={message} setMessage={setMessage} />
      </form>

      <AlertInfo
        showOnMount={toggleStates.autoSendCV}
        backdrop
        title={"Автоматична відправка CV"}
        text={
          'Зверни увагу! Доступно лише 100 безкоштовних відправок. Для того щоб продовжити "Автоматична відправка CV"- оберіть передоплату'
        }
        buttonText={"Оформити передплату"}
        onButtonClick={() => alert('Done "Автоматична відправка CV"')}
        onClose={() => handleAlertClose("autoSendCV")}
      />

      <AlertInfo
        showOnMount={toggleStates.autoCompareJobs}
        backdrop
        title={"Автоматичне порівняння вакансій"}
        text={
          'Зверни увагу! Доступно лише 3 безкоштовні перевірки, Для того щоб продовжити "Автоматичне порівняння вакансій"- оберіть передоплату'
        }
        buttonText={"Оформити передплату"}
        onButtonClick={() => alert('Done "Передоплата ПОРІВНЯННЯ"')}
        onClose={() => handleAlertClose("autoCompareJobs")}
      />
    </ProfileTabs>
  );
}
