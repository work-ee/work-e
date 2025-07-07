import React from "react";

import { ProfileSvg } from "@/components/icons";
import { Button } from "@/components/ui";

import { CardList } from "./CardList";
import { Title } from "./Title";

export const Step2 = () => {
  return (
    <div>
      <Title
        title="Твій профіль уже частково готовий."
        subtitle="Що більше ти розкажеш про себе — тим точнішими будуть наші пропозиції."
      />

      <div className="flex gap-12 justify-center mt-8">
        <Button>
          <ProfileSvg />
          Заповнити профіль
        </Button>
      </div>

      <div className="my-4">
        <p>
          або просто <button className="text-link underline">додай CV</button> чи{" "}
          <button className="text-link underline">підключи Linkedin</button>
        </p>
      </div>

      <div className="mt-12 flex items-stretch">
        <CardList muted />
      </div>
    </div>
  );
};
