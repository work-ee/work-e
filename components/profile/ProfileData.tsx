import { Input } from "@/components/ui";

import type { IUserFormData } from "@/types/next-auth";

interface ProfileProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: IUserFormData;
}

export const ProfileData = ({ handleChange, formData }: ProfileProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="">
        <h2 className="heading-h3">Особисті дані</h2>
      </div>

      <div className="flex w-full flex-wrap gap-4">
        <div className="flex-1">
          <Input
            onChange={handleChange}
            className="w-full"
            value={formData.first_name}
            name="first_name"
            id="first_name"
            label="Ім'я:"
          />
        </div>
        <div className="flex-1">
          <Input
            className="w-full"
            onChange={handleChange}
            value={formData.last_name}
            name="last_name"
            id="last_name"
            label="Прізвище:"
          />
        </div>
      </div>

      <div className="flex w-full flex-wrap gap-4">
        {/* <div className="flex-1">
          <Input
            onChange={handleChange}
            value={formData.username}
            name="username"
            id="username"
            label="Username:"
          />
        </div> */}
        <div className="flex-1">
          <Input
            className="w-full"
            type="email"
            onChange={handleChange}
            value={formData.email}
            name="email"
            id="email"
            label="Email:"
          />
        </div>
      </div>

      <div className="flex w-full flex-wrap gap-4">
        <div className="flex-1">
          <Input
            onChange={handleChange}
            className="w-full"
            value={formData.linkedin_url || ""}
            name="linkedin_url"
            id="linkedin_url"
            label="Linkedin url:"
            placeholder="https://www.linkedin.com/in/your-profile"
          />
        </div>
      </div>

      <div className="flex w-full flex-wrap gap-4">
        <div className="flex-1">
          <Input
            disabled
            onChange={handleChange}
            className="w-full"
            value={formData.cv || ""}
            name="cv"
            id="cv"
            label="CV:"
            placeholder="https://www.example.com/your-cv.pdf"
          />
        </div>
      </div>

      <div className="mt-2 flex flex-wrap justify-between gap-2">
        <div className="flex gap-2">
          <span className="text-neutral-500">Дата приєднання:</span>
          <span className="text-neutral-800">
            {formData.date_joined && new Date(formData.date_joined).toLocaleDateString("uk-UA")}
          </span>
        </div>
      </div>
    </div>
  );
};
