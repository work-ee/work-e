import { PromptKey } from "@/lib/prompts/prompts";

import { PromptData } from "@/types/prompts";

interface HandleGenerateClickParams<K extends PromptKey> {
  promptKey: K;
  data: PromptData<K>;
  callback: (generatedText: string) => void;
  setIsLoading: (val: boolean) => void;
}

export async function handleGenerateClick<K extends PromptKey>({
  promptKey,
  data,
  callback,
  setIsLoading,
}: HandleGenerateClickParams<K>) {
  setIsLoading(true);

  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ promptKey, data }),
  });

  if (!response.ok) {
    setIsLoading(false);
    throw new Error("Помилка при генерації тексту.");
  }

  const result = await response.json();
  callback(result.generatedText);

  setIsLoading(false);
}
