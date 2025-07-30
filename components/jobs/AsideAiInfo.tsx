"use client";

import { useState } from "react";

import { AlertInfo } from "../feedback/AlertInfo";
import { MagicSvg } from "../icons";
import { Button } from "../ui";

export const AsideAiInfo = () => {
  const [toggleStates, setToggleStates] = useState({
    autoSendCV: false,
  });
  const handleActivate = () => {
    setToggleStates((prev) => ({
      ...prev,
      autoSendCV: true,
    }));
  };
  return (
    <div className="border-primary-100 flex flex-col gap-4 rounded-md p-6 shadow-[0_0_0_2px_var(--color-primary-100)] sm:px-6">
      <h3 className="heading-h3 text-primary-700">
        Твій AI-кар'єрний стратег: Персоналізовані CV та листи – автоматично!
      </h3>
      <p>
        Забудь про стандартні відгуки та години ручної роботи! Тепер розумний AI індивідуально адаптує ключові аспекти
        твого CV та пише унікальний, аргументований супровідний лист для кожної вакансії. Максимізуй свої шанси та
        вражай рекрутерів без зайвих зусиль!
      </p>

      <Button onClick={handleActivate} className="btn-sm justify-center">
        <MagicSvg />
        Активувати
      </Button>

      <AlertInfo
        showOnMount={toggleStates.autoSendCV}
        title={"Автоматична відправка CV"}
        text={
          "Зверни увагу! Доступно лише 100 безкоштовних відправок. Для того щоб продовжити “Автоматична відправка CV”- оберіть передоплату"
        }
        buttonText={"Оформити передплату"}
        onButtonClick={() => alert('Done "Автоматична відправка CV"')}
      />
    </div>
  );
};
