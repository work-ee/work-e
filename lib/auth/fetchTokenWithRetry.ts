interface Props {
  url: string;
  accessToken: string;
  retries?: number;
  delayMs?: number;
}

export async function fetchTokenWithRetry({ url, accessToken, retries = 4, delayMs = 1500 }: Props) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: accessToken }),
      });

      if (res.ok) {
        return await res.json(); // ✅ Done
      }

      const text = await res.text();

      if (text.includes("Token used too early")) {
        console.warn(`🕒 Google token too early (attempt ${attempt + 1}), retrying...`);
        await new Promise((r) => setTimeout(r, delayMs));
        continue;
      }

      console.error(`❌ Backend error:`, text);
      throw new Error(text);
    } catch (error) {
      // Handle network errors (like ENOTFOUND)
      if (error instanceof TypeError && error.message.includes("fetch")) {
        console.error(`🌐 Network error (attempt ${attempt + 1}):`, error.message);
        if (attempt < retries - 1) {
          await new Promise((r) => setTimeout(r, delayMs));
          continue;
        }
      }
      throw error;
    }
  }

  throw new Error("❌ All retries failed");
}
