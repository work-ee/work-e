import Link from "next/link";

import { User } from "next-auth";

import { CVUploadTrigger } from "@/components/feedback/CVUploadPopup/CVUploadTrigger";
import { ProfileSvg } from "@/components/icons";
import { Button } from "@/components/ui";

import { Title } from "./Title";

interface StepProps {
  user?: User;
  onCvUploadSuccess: () => void;
}

export const Step2 = ({ user, onCvUploadSuccess }: StepProps) => {
  return (
    <div>
      <Title
        title="Твій профіль уже частково готовий."
        subtitle="Що більше ти розкажеш про себе — тим точнішими будуть наші пропозиції."
      />

      <div className="mt-8 flex justify-center gap-12">
        <Link href="cv">
          {/* <Link href="profile"> */}
          <Button>
            <ProfileSvg />
            Заповнити профіль
          </Button>
        </Link>
      </div>

      <div className="my-4">
        <p>
          або просто <CVUploadTrigger email={user?.email} onSuccessUpload={onCvUploadSuccess} variant="link" /> чи{" "}
          <button className="text-link underline">підключи Linkedin</button>
        </p>
      </div>
    </div>
  );
};
