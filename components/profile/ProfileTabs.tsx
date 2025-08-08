import { Tabs, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";

interface ProfileTabsProps {
  children: React.ReactNode;
}

export function ProfileTabs({ children }: ProfileTabsProps) {
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
      {children}
    </Tabs>
  );
}
