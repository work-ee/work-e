"use client";

import { useState } from "react";

import { Button, Input, Toggle } from "@/components/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";

import { BackendUser } from "@/types/next-auth";

type ToggleName = "autoSendCV" | "autoCompareJobs" | "emailNotifications";

export const Profile = ({ user }: { user?: BackendUser }) => {
  const { first_name, last_name, email, username, avatar_url, date_joined } = user || {
    first_name: "Guest",
    last_name: "User",
    email: "guest@example.com",
    username: "guest_user",
    avatar_url: null,
    date_joined: new Date().toLocaleDateString(),
  };

  const [formData, setFormData] = useState({
    first_name: first_name || "",
    last_name: last_name || "",
    email: email || "",
    username: username || "",
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

  const [toggleStates, setToggleStates] = useState<{
    [key in ToggleName]: boolean;
  }>({
    autoSendCV: true,
    autoCompareJobs: false,
    emailNotifications: false,
  });
  const handleToggle = (name: ToggleName) => {
    setToggleStates((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <Tabs defaultValue="profile" className="gap-8">
      <TabsList className="flex h-auto justify-between gap-4 rounded-none bg-white p-0">
        <TabsTrigger
          value="profile"
          className="underline-primary-500 data-[state=active]:text-primary-500 hover:text-primary-500 cursor-pointer rounded-none p-1 underline-offset-6 transition duration-300 hover:!opacity-100 data-[state=active]:underline data-[state=active]:shadow-none data-[state=inactive]:opacity-50"
        >
          <h3 className="heading-h3">Профіль</h3>
        </TabsTrigger>

        <TabsTrigger
          value="settings"
          className="underline-primary-500 data-[state=active]:text-primary-500 hover:text-primary-500 cursor-pointer rounded-none p-1 underline-offset-6 transition duration-300 hover:!opacity-100 data-[state=active]:underline data-[state=active]:shadow-none data-[state=inactive]:opacity-50"
        >
          <h3 className="heading-h3">Налаштування</h3>
        </TabsTrigger>
      </TabsList>

      <form className="flex flex-col gap-6">
        <TabsContent
          value="profile"
          className="data-[state=active]:animate-in data-[state=active]:fade-in data-[state=active]:zoom-in data-[state=inactive]:animate-fade-out data-[state=inactive]:fade-out data-[state=inactive]:zoom-out"
        >
          <div className="flex flex-col gap-1">
            <div className="flex w-full flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <Input
                  onChange={handleChange}
                  value={formData.username}
                  name="username"
                  id="username"
                  label="Username:"
                />
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <Input
                  onChange={handleChange}
                  value={formData.first_name}
                  name="first_name"
                  id="first_name"
                  label="Ім'я:"
                />
              </div>
              <div className="flex items-center gap-4">
                <Input
                  onChange={handleChange}
                  value={formData.last_name}
                  name="last_name"
                  id="last_name"
                  label="Прізвище:"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <div className="flex w-full items-center gap-4">
                <span className="text-neutral-500">Електронна пошта:</span>
                <span className="text-neutral-800">{email}</span>
              </div>

              <div className="flex w-full items-center gap-4">
                <span className="text-neutral-500">Дата приєднання:</span>
                <span className="text-neutral-800">{new Date(date_joined).toLocaleDateString("uk-UA")}</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="settings"
          className="data-[state=active]:animate-in data-[state=active]:fade-in data-[state=active]:zoom-in data-[state=inactive]:animate-fade-out data-[state=inactive]:fade-out data-[state=inactive]:zoom-out"
        >
          <div className="flex flex-col">
            <div className="flex w-full flex-wrap gap-4">
              <div className="bg-secondary-50 flex w-full flex-wrap items-center justify-between gap-4 rounded-md p-4">
                <div className="flex flex-col gap-1">
                  <div className="heading-h3 text-neutral-900">Автоматична відправка CV</div>
                  <span className="text-neutral-700">
                    Для того щоб нічого не пропустити ви можете надіслати CV автоматично
                  </span>
                </div>
                <Toggle name="1" isChecked={toggleStates.autoSendCV} onChange={() => handleToggle("autoSendCV")} />
              </div>

              <div className="bg-secondary-50 flex w-full flex-wrap items-center justify-between gap-4 rounded-md p-4">
                <div className="flex flex-col gap-1">
                  <div className="heading-h3 text-neutral-900">Автоматичне порівняння вакансій</div>
                  <span className="text-neutral-700">Ваше резюме автоматично буде порівнюватись з вакансіями</span>
                </div>
                <Toggle
                  name="autoCompareJobs"
                  isChecked={toggleStates.autoCompareJobs}
                  onChange={() => handleToggle("autoCompareJobs")}
                />
              </div>

              <div className="bg-secondary-50 flex w-full flex-wrap items-center justify-between gap-4 rounded-md p-4">
                <div className="flex flex-col gap-1">
                  <div className="heading-h3 text-neutral-900">Сповіщення електронною поштою</div>
                  <span className="text-neutral-700">Нові пропозиції та функції які можуть бути корисними для вас</span>
                </div>
                <Toggle
                  name="emailNotifications"
                  isChecked={toggleStates.emailNotifications}
                  onChange={() => handleToggle("emailNotifications")}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <div className="mt-2 flex items-center gap-4">
          <Button className="mt-4">Зберегти зміни</Button>
        </div>
      </form>
    </Tabs>
  );
};
