"use client";

import { useState } from "react";

import { User } from "next-auth";

import { Step1, Step2, Step3, Step4 } from "@/components/onboarding";
import { SvgProgressCircle } from "@/components/onboarding/SvgProgressCircle";
import { Button } from "@/components/ui";

type StepProps = { user?: User };

const steps = [Step1, Step2, Step3, Step4] as const;

export default function ClientOnboarding({ user }: StepProps) {
  const [index, setIndex] = useState<number>(0);

  const Total = steps.length;
  const Current = steps[index];
  const percent = Math.round((index / (Total - 1)) * 100);

  const next = () => setIndex((i) => Math.min(i + 1, Total - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  return (
    <>
      <section className="section">
        <div className="container text-center">
          <div className="mb-8 flex justify-center">
            <SvgProgressCircle percent={percent} />
          </div>

          <Current user={user} />
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
