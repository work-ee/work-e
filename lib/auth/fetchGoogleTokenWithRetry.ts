export async function fetchGoogleTokenWithRetry(url: string, idToken: string, retries = 4, delayMs = 1500) {
  for (let attempt = 0; attempt < retries; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_token: idToken }),
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
  }

  throw new Error("❌ Google token: all retries failed");
}
