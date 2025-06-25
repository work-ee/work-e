export type CV = { id: string };

export async function getExistingCVs(email: string): Promise<CV[]> {
  const res = await fetch("/api/cvs/by-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (res.ok) return res.json();
  if ([204, 404].includes(res.status)) return [];
  throw new Error((await res.json()).message || "Не вдалося отримати список CV.");
}

export async function deleteCVs(cvs: CV[]) {
  await Promise.all(
    cvs.map(async (cv) => {
      const res = await fetch(`/api/cvs/${cv.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) console.error(`Не вдалося видалити CV: ${cv.id}`);
    })
  );
}

export async function uploadCV(file: File, email: string) {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("cv_file", file);

  const res = await fetch("/api/cvs", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error((await res.json()).message || "Помилка при збереженні CV.");
  }
}
