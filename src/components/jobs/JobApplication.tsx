"use client";

import { useState } from "react";

import { Mail } from "lucide-react";

import { AlertInfo } from "@/components/feedback/AlertInfo";
// import { CoverLetterGoogle } from "@/components/shared";
import { Button, Input } from "@/components/ui";

interface Props {
  haveApplied?: boolean;
}

const JobApplicationComponent = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <>
      <form className="mt-8 flex flex-col gap-4">
        <section className="section mb-0">
          <div className="container">
            <h3 className="heading-h3 neutral-900 mb-2">Резюме</h3>
            <p className="text-micro neutral-900 mb-4">
              Додайте своє резюме, щоб роботодавець міг ознайомитися з вашим досвідом та навичками.
            </p>

            <div className="flex w-full flex-wrap gap-4">
              <div className="flex-1">
                <Input
                  id="resume"
                  name="resume"
                  value=""
                  placeholder="Вставте своє резюме"
                  type="file"
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* <CoverLetterGoogle jobDescription="" /> */}

        <Button type="button" onClick={handleSubmit} className="btn-sm mt-6 w-full">
          <Mail />
          Відправити заявку
        </Button>
      </form>

      <AlertInfo
        showOnMount={isSubmitted}
        title="Супер!"
        text="Вітаю ти подався на вакансію. Чекай відповіді від HR"
        buttonText={"Надсилати автоматично"}
        onButtonClick={() => alert('Done "Автоматична відправлення CV"')}
        backdrop
      />
    </>
  );
};

export const JobApplication = ({ haveApplied }: Props) => {
  const [isApplied, setIsApplied] = useState(false);

  if (!isApplied) {
    return (
      <div className="mt-8 flex items-center justify-between gap-4">
        <Button
          type="button"
          className="btn-sm w-full"
          variant="secondary"
          disabled={haveApplied}
          onClick={() => {
            setIsApplied(true);
            setTimeout(() => {
              window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            }, 100);
          }}
        >
          <Mail />
          Подати на вакансію
        </Button>
      </div>
    );
  }

  return <JobApplicationComponent />;
};
