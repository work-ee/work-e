import { ProfileSvg } from "@/components/icons";
import { Button } from "@/components/ui";

import { Title } from "./Title";

export const Step3 = () => {
  return (
    <div>
      <Title
        title="Ти на фінішній прямій!"
        subtitle="Твій профіль майже готовий — і вже сьогодні тут може з’явитися вакансія мрії. Просто дозаповни кілька полів — і ми підкинемо ще точніші варіанти"
      />

      <div className="mt-8 flex justify-center gap-12">
        <Button>
          <ProfileSvg />
          Заповнити профіль
        </Button>
      </div>
    </div>
  );
};
