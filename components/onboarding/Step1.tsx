import { User } from "next-auth";

import { CVUploadTrigger } from "@/components/feedback/CVUploadPopup/CVUploadTrigger";
import { LinkedinSvg } from "@/components/icons";
import { Button } from "@/components/ui";

import { Title } from "./Title";

interface StepProps {
  user?: User;
  onCvUploadSuccess: () => void;
}

export const Step1 = ({ user, onCvUploadSuccess }: StepProps) => {
  return (
    <div>
      <Title
        // ! ToDO: Fix the title to be more descriptive and without HTML tags
        title={`Серед 10 000+ вакансій уже є й твоя. <br /> Але ми не знаємо, яка саме`}
        subtitle="Щодня на платформі з'являються сотні нових можливостей — і ми хочемо показати ті, що ідеально підходять саме
          тобі."
      />

      {/* <h2 className="heading-h3">Щоб допомогти:</h2> */}

      <div className="mt-8 flex justify-center gap-12">
        <Button variant="secondary">
          <LinkedinSvg />
          Підв'яжи свій Linkedin
        </Button>
        <CVUploadTrigger email={user?.email} onSuccessUpload={onCvUploadSuccess} />
      </div>

      <div className="mt-12">
        <p>Це займе декілька хвилин — і ми зможемо підказати, де тебе чекають.</p>
        <p className="heading-h3">Твоя вакансія вже тут. Допоможи нам її знайти для тебе.</p>
      </div>
    </div>
  );
};
