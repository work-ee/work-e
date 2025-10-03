import { PromptKey } from "@/lib/prompts/prompts";

export type PromptDataMap = {
  COVER_LETTER: string;
  GENERATE_CV_SUMMARY_UK: string;
  GENERATE_EXPERIENCE_DESCRIPTION_UK: {
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    userInput: string;
  };
};

export type PromptData<K extends PromptKey> = PromptDataMap[K];
