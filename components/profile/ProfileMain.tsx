"use client";

import { useState, useTransition } from "react";

import { AlertInfo } from "@/components/feedback";
import { ProfileActions, ProfileData, ProfileSettings, ProfileTabs } from "@/components/profile";
import type { ToggleName } from "@/components/profile/ProfileSettings";
import { TabsContent } from "@/components/ui/shadcn/tabs";

import { updateUserProfile, updateUserSettings } from "@/actions/server/user";
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

  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [toggleStates, setToggleStates] = useState<{
    [key in ToggleName]: boolean;
  }>({
    autoSendCV: false,
    autoCompareJobs: false,
    emailNotifications: true,
  });

  const [formData, setFormData] = useState<IUserFormData>({
    first_name: first_name || "",
    last_name: last_name || "",
    email: email || "",
    username: username || "",
    linkedin_url: "",
    cv: "",
    avatar_url: avatar_url || "",
    date_joined: date_joined || new Date().toLocaleDateString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        // Update profile data
        const profileResult = await updateUserProfile(
          {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            username: formData.username,
            avatar_url: formData.avatar_url,
          },
          user?.id as number
        );

        // Update settings
        const settingsResult = await updateUserSettings(toggleStates);

        if (profileResult.success && settingsResult.success) {
          setMessage({ type: "success", text: "Профіль успішно оновлено!" });
        } else {
          setMessage({ type: "error", text: "Помилка при оновленні профілю" });
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage({ type: "error", text: "Помилка при оновленні профілю" });
      }
    });
  };

  return (
    <ProfileTabs>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <TabsContent
          value="profile"
          className="data-[state=active]:animate-in data-[state=active]:fade-in data-[state=active]:zoom-in data-[state=inactive]:animate-fade-out data-[state=inactive]:fade-out data-[state=inactive]:zoom-out"
        >
          <ProfileData handleChange={handleChange} formData={formData} />
        </TabsContent>

        <TabsContent
          value="settings"
          className="data-[state=active]:animate-in data-[state=active]:fade-in data-[state=active]:zoom-in data-[state=inactive]:animate-fade-out data-[state=inactive]:fade-out data-[state=inactive]:zoom-out"
        >
          <ProfileSettings handleToggle={handleToggle} toggleStates={toggleStates} />
        </TabsContent>

        <ProfileActions isPending={isPending} message={message} />
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
