"use client";

import React from "react";

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

  const [formData, setFormData] = React.useState({
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

  const [toggleStates, setToggleStates] = React.useState<{
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
      <TabsList className="bg-white h-auto rounded-none p-0 gap-4 flex justify-between">
        <TabsTrigger
          value="profile"
          className="cursor-pointer data-[state=inactive]:opacity-50 data-[state=active]:underline underline-offset-6 underline-primary-500 p-1 rounded-none data-[state=active]:shadow-none data-[state=active]:text-primary-500 transition duration-300 hover:!opacity-100 hover:text-primary-500"
        >
          <h3 className="heading-h3">Профіль</h3>
        </TabsTrigger>

        <TabsTrigger
          value="settings"
          className="cursor-pointer data-[state=inactive]:opacity-50 data-[state=active]:underline underline-offset-6 underline-primary-500 p-1 rounded-none data-[state=active]:shadow-none data-[state=active]:text-primary-500 transition duration-300 hover:!opacity-100 hover:text-primary-500"
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
            <div className="flex flex-wrap gap-4 w-full">
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

            <div className="flex flex-wrap gap-4 w-full">
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

            <div className="flex flex-wrap gap-2 mt-4">
              <div className="flex items-center gap-4 w-full">
                <span className="text-neutral-500">Електронна пошта:</span>
                <span className="text-neutral-800">{email}</span>
              </div>

              <div className="flex items-center gap-4 w-full">
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
            <div className="w-full flex flex-wrap gap-4">
              <div className="flex bg-secondary-50 flex-wrap w-full gap-4 rounded-md p-4 justify-between items-center">
                <div className="flex flex-col gap-1">
                  <div className="text-neutral-900 heading-h3 ">Автоматична відправка CV</div>
                  <span className="text-neutral-700">
                    Для того щоб нічого не пропустити ви можете надіслати CV автоматично
                  </span>
                </div>
                <Toggle name="1" isChecked={toggleStates.autoSendCV} onChange={() => handleToggle("autoSendCV")} />
              </div>

              <div className="flex bg-secondary-50 flex-wrap w-full gap-4 rounded-md p-4 justify-between items-center">
                <div className="flex flex-col gap-1">
                  <div className="text-neutral-900 heading-h3 ">Автоматичне порівняння вакансій</div>
                  <span className="text-neutral-700">Ваше резюме автоматично буде порівнюватись з вакансіями</span>
                </div>
                <Toggle
                  name="autoCompareJobs"
                  isChecked={toggleStates.autoCompareJobs}
                  onChange={() => handleToggle("autoCompareJobs")}
                />
              </div>

              <div className="flex bg-secondary-50 flex-wrap w-full gap-4 rounded-md p-4 justify-between items-center">
                <div className="flex flex-col gap-1">
                  <div className="text-neutral-900 heading-h3 ">Сповіщення електронною поштою</div>
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

        <div className="flex items-center gap-4 mt-2">
          <Button className="mt-4">Зберегти зміни</Button>
        </div>
      </form>
    </Tabs>
  );
};
