import { Input } from "@/components/ui";

import { UserState } from "@/actions/server/user";

interface ProfileProps {
  state: UserState;
  dataJoined: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileData = ({ state, dataJoined }: ProfileProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="">
        <h2 className="heading-h3">Особисті дані</h2>
      </div>

      <div className="flex w-full flex-wrap gap-4">
        <div className="flex-1">
          <Input
            className="w-full"
            name="first_name"
            id="first_name"
            label="Ім'я:"
            defaultValue={state.first_name ?? ""}
            placeholder="First Name"
            error={state.errors?.first_name}
          />
        </div>

        <div className="flex-1">
          <Input
            className="w-full"
            name="last_name"
            id="last_name"
            label="Прізвище:"
            defaultValue={state.last_name ?? ""}
            placeholder="Last Name"
            error={state.errors?.last_name}
          />
        </div>
      </div>

      <div className="flex w-full flex-wrap gap-4">
        <div className="flex-1">
          <Input
            // disabled
            className="w-full"
            type="email"
            name="email"
            id="email"
            label="Email:"
            defaultValue={state.email ?? ""}
            placeholder="Email"
            error={state.errors?.email}
          />
        </div>
      </div>

      <div className="flex w-full flex-wrap gap-4">
        <div className="flex-1">
          <Input
            disabled
            className="w-full"
            name="linkedin_url"
            id="linkedin_url"
            label="Linkedin url:"
            defaultValue={state.linkedin_url ?? ""}
            placeholder="https://www.linkedin.com/in/your-profile"
            error={state.errors?.linkedin_url}
          />
        </div>
      </div>

      <div className="flex w-full flex-wrap gap-4">
        <div className="flex-1">
          <Input
            disabled
            className="w-full"
            name="cv"
            id="cv"
            label="CV:"
            defaultValue={state.cv ?? ""}
            placeholder="https://www.example.com/your-cv.pdf"
            error={state.errors?.cv}
          />
        </div>
      </div>

      <div className="mt-2 flex flex-wrap justify-between gap-2">
        <div className="flex gap-2">
          <span className="text-neutral-500">Дата приєднання:</span>
          <span className="text-neutral-800">{new Date(dataJoined).toLocaleDateString("uk-UA")}</span>
        </div>
      </div>
    </div>
  );
};
