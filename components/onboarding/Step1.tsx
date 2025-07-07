import React from "react";

import { User } from "next-auth";

import { CVUploadTrigger } from "@/components/feedback/CVUploadPopup/CVUploadTrigger";
import { LinkedinSvg } from "@/components/icons";
import { Button } from "@/components/ui";

import { Title } from "./Title";

export const Step1 = ({ user }: { user?: User }) => {
  return (
    <div>
      <Title
        title="Серед 10 000+ вакансій уже є й твоя. Але ми не знаємо, яка саме"
        subtitle="Щодня на платформі з’являються сотні нових можливостей — і ми хочемо показати ті, що ідеально підходять саме
          тобі."
      />

      <h2 className="heading-h3">Щоб допомогти:</h2>

      <div className="flex gap-12 justify-center mt-8">
        <Button variant="secondary">
          <LinkedinSvg />
          Підв'яжи свій Linkedin
        </Button>

        {/* <Button>Завантаж своє CV</Button> */}
        <CVUploadTrigger email={user?.email} />
      </div>

      <div className="mt-12">
        <p>Це займе декілька хвилин — і ми зможемо підказати, де тебе чекають.</p>
        <p className="heading-h3">Твоя вакансія вже тут. Допоможи нам її знайти для тебе.</p>
      </div>
    </div>
  );
};
