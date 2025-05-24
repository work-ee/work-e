import { DialogMsg } from "@/components/ui/DialogMsg";

import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="center-page">
      <section className="section">
        <div className="container">
          <div className="text-center">
            <h1 className="heading-h1 mb-4">Швидкий пошук роботи на Work - E</h1>
            <p className=".heading-h3 mb-4">Для всіх хто працює в IT</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ul className="grid grid-cols-3">
            <li className="flex flex-col items-center text-center">
              <b>50,000+</b>
              <p>створених резюме</p>
            </li>
            <li className="flex flex-col items-center text-center">
              <b>10,000+</b>
              <p>успішних наймів</p>
            </li>
            <li className="flex flex-col items-center text-center">
              <b>5000+</b>
              <p>вакансій</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="mx-auto max-w-2xl py-12 text-center">
            Розкажи про свій досвід і очікування від роботи. Ми допоможемо створити для тебе ідеальне резюме та
            супроводжуючий лист, а також підберем найкращі вакансії. Всього за кілька хвилин.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ul className="grid grid-cols-3 justify-around">
            <li className="flex max-w-[20rem] flex-col items-center gap-4 text-center">
              <b>Чому Work-e?</b>
              <img src="/img/exa/x.svg" alt="icon" />
              <p>За допомогою AI створіть ідеальне резюме та супроводжуючий лист, підберіть вакансії для тебе.</p>
            </li>
            <li className="flex max-w-[20rem] flex-col items-center gap-4 text-center">
              <b>Як швидко я отримаю вакансії?</b>
              <img src="/img/exa/x.svg" alt="icon" />
              <p>Залежить від вашого досвіду, але наш AI швидко підбере найкращі варіанти.</p>
            </li>
            <li className="flex max-w-[20rem] flex-col items-center gap-4 text-center">
              <b>Чи можна залишитися анонімним?</b>
              <img src="/img/exa/x.svg" alt="icon" />
              <p>Ваші дані захищені. Ви можете вибрати, коли і кому показувати ваші контакти</p>
            </li>
          </ul>
        </div>
      </section>

      {session && <DialogMsg showOnMount />}
    </main>
  );
}
