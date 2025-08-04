"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { User } from "next-auth";

import { Step1, Step2, Step3, Step4, SvgProgressCircle } from "@/components/onboarding";
import { Button } from "@/components/ui";

import { IJob } from "@/types/jobs";

import { CardList } from "./CardList";

type StepProps = {
  user?: User;
  jobs?: IJob[];
};

const steps = [Step1, Step2, Step3, Step4] as const;

export function OnboardingMain({ user, jobs }: StepProps) {
  const [index, setIndex] = useState<number>(0);
  const [isCVUploaded, setIsCVUploaded] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const Total = steps.length;
  const Current = steps[index];
  const percent = Math.round((index / (Total - 1)) * 100);

  const next = () => setIndex((i) => Math.min(i + 1, Total - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const handleCvUploadSuccess = () => {
    if (!isCVUploaded) {
      next();
      setIsCVUploaded(true);
    }
  };

  useEffect(() => {
    // clear query parameters after OAuth login
    if (searchParams.get("code")) {
      const url = new URL(window.location.href);
      url.searchParams.delete("code");
      url.searchParams.delete("scope");
      url.searchParams.delete("authuser");
      url.searchParams.delete("prompt");
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams]);

  return (
    <>
      <section className="section">
        <div className="container text-center">
          <div className="mb-8 flex justify-center">
            <SvgProgressCircle percent={percent} />
          </div>

          <Current user={user} onCvUploadSuccess={handleCvUploadSuccess} />

          {Current === Step2 && <CardList muted data={jobs} />}
          {Current === Step3 && <CardList moreBtn data={jobs} />}
          {Current === Step4 && <CardList moreBtn data={jobs} />}
        </div>
      </section>

      <div className="fixed right-0 bottom-0 flex gap-4 p-4">
        <Button variant="secondary" onClick={prev} disabled={index === 0}>
          Prev
        </Button>

        <Button onClick={next} disabled={index === Total - 1}>
          Next
        </Button>
      </div>
    </>
  );
}
