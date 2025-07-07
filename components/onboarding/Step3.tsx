import React from "react";

import { ProfileSvg } from "@/components/icons";
import { Button } from "@/components/ui";

import { CardList } from "./CardList";
import { Title } from "./Title";

export const Step3 = () => {
  return (
    <div>
      <Title
        title="Ти на фінішній прямій!"
        subtitle="Твій профіль майже готовий — і вже сьогодні тут може з’явитися вакансія мрії. Просто дозаповни кілька полів — і ми підкинемо ще точніші варіанти"
      />

      <div className="flex gap-12 justify-center mt-8">
        <Button>
          <ProfileSvg />
          Заповнити профіль
        </Button>
      </div>

      <div className="mt-12 flex items-stretch">
        <CardList moreBtn />
      </div>
    </div>
  );
};
