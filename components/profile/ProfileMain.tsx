"use client";

import { useActionState, useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import { AlertInfo } from "@/components/feedback";
import { ProfileActions, ProfileData, ProfileSettings, ProfileTabs } from "@/components/profile";
import type { ToggleName } from "@/components/profile/ProfileSettings";
import { TabsContent } from "@/components/ui/shadcn/tabs";

import { updateUserProfile } from "@/actions/server/user";
import type { BackendUser, IUserFormData } from "@/types/next-auth";

export function ProfileMain({ user }: { user: BackendUser | null }) {
  const { first_name, last_name, email, username, avatar_url, date_joined } = user || {
    first_name: "Guest",
    last_name: "User",
    email: "guest@example.com",
    username: "guest_user",
    avatar_url: null,
    date_joined: new Date().toLocaleDateString(),
  };

  const { update } = useSession();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [toggleStates, setToggleStates] = useState<{
    [key in ToggleName]: boolean;
  }>({
    autoSendCV: false,
    autoCompareJobs: false,
    emailNotifications: true,
  });
  const [formData] = useState<IUserFormData>({
    first_name: first_name || "",
    last_name: last_name || "",
    email: email || "",
    username: username || "",
    linkedin_url: "",
    cv: "",
    avatar_url: avatar_url || "",
  });

  const updateUserWithId = updateUserProfile.bind(null, user?.id?.toString() || "");
  const [state, formAction, isPending] = useActionState(updateUserWithId, formData);

  useEffect(() => {
    if (state.errors && Object.keys(state.errors).length === 0 && !isPending) {
      setMessage({ type: "success", text: "Профіль успішно оновлено!" });

      update({
        backendUser: {
          ...user,
          first_name: state.first_name,
          last_name: state.last_name,
          email: state.email,
        },
      });
    } else if (state.errors && Object.keys(state.errors).length > 0 && !isPending) {
      // setMessage({ type: "error", text: "Будь ласка, виправте помилки у формі" });
      setMessage({ type: "error", text: state.errors._general || "Будь ласка, виправте помилки у формі" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.errors, isPending]);

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

  return (
    <ProfileTabs>
      <form className="flex flex-col gap-6" action={formAction} noValidate>
        <TabsContent
          value="profile"
          className="data-[state=active]:animate-in data-[state=active]:fade-in data-[state=active]:zoom-in data-[state=inactive]:animate-fade-out data-[state=inactive]:fade-out data-[state=inactive]:zoom-out"
        >
          <ProfileData state={state} dataJoined={date_joined} />
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
          "Зверни увагу! Доступно лише 100 безкоштовних відправок. Для того щоб продовжити “Автоматична відправка CV”- оберіть передоплату"
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
          "Зверни увагу! Доступно лише 3 безкоштовні перевірки, Для того щоб продовжити “Автоматичне порівняння вакансій”- оберіть передоплату"
        }
        buttonText={"Оформити передплату"}
        onButtonClick={() => alert('Done "Передоплата ПОРІВНЯННЯ"')}
        onClose={() => handleAlertClose("autoCompareJobs")}
      />
    </ProfileTabs>
  );
}
