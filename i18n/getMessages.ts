export async function getMessages(locale: string) {
  try {
    return (await import(`../messages/${locale}.json`)).default;
  } catch {
    return (await import(`../messages/uk.json`)).default;
  }
}
