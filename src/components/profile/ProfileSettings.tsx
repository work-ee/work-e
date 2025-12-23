import { Toggle } from "@/components/ui";

export type ToggleName = "autoSendCV" | "autoCompareJobs" | "emailNotifications";

interface Props {
  handleToggle: (name: ToggleName) => void;
  toggleStates: {
    autoSendCV: boolean;
    autoCompareJobs: boolean;
    emailNotifications: boolean;
  };
}

export const ProfileSettings = ({ handleToggle, toggleStates }: Props) => {
  return (
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
  );
};
