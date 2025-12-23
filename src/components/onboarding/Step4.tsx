import { Search } from "lucide-react";

import { Button } from "@/components/ui";

import { Title } from "./Title";

export const Step4 = () => {
  return (
    <div>
      <Title
        title="Профіль заповнено !"
        subtitle="Тепер ти бачиш найкращі вакансії саме під тебе. Відгукуйся, зберігай, отримуй нові пропозиції — удачі"
      />

      <div className="mt-8 flex justify-center gap-12">
        <Button>
          <Search />
          Знайти ідеальну роботу
        </Button>
      </div>

      <div className="my-4">
        <p>Ми будемо оновлювати добірки щодня — заходь, щоб не пропустити шанс</p>
      </div>
    </div>
  );
};
