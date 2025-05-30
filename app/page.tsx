import LinkedInShowPopup from "@/components/LinkedInShowPopup";
import { DialogMsg } from "@/components/feedback/DialogMsg";

import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="center-page">
      <section className="section">
        <div className="container">
          <div className="text-center">
            <h1 className="heading-h1 mb-4">Швидкий пошук роботи на Work - E</h1>
            <p className="heading-h3 mb-4">Для всіх хто працює в IT</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ul className="grid grid-cols-3">
            <li className="flex flex-col gap-2 items-center text-center">
              <b className="heading-h2 text-primary-700 font-black">50,000+</b>
              <p className="heading-h3">створених резюме</p>
            </li>
            <li className="flex flex-col gap-2 items-center text-center">
              <b className="heading-h2 text-primary-700 font-black">10,000+</b>
              <p className="heading-h3">успішних наймів</p>
            </li>
            <li className="flex flex-col gap-2 items-center text-center">
              <b className="heading-h2 text-primary-700 font-black">5000+</b>
              <p className="heading-h3">вакансій</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="mx-auto max-w-2xl py-4 text-center">
            Розкажи про свій досвід і очікування від роботи. Ми допоможемо створити для тебе ідеальне резюме та
            супроводжуючий лист, а також підберем найкращі вакансії. Всього за кілька хвилин.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ul className="grid xl:grid-cols-3 gap-12 justify-around">
            <li className="flex flex-col items-center gap-4 text-center px-4 py-6 rounded-2xl bg-secondary-50">
              <b>Чому Work-e?</b>
              <img src="./icons/checked.svg" alt="" />
              <p>За допомогою AI створіть ідеальне резюме та супроводжуючий лист, підберіть вакансії для тебе.</p>
            </li>
            <li className="flex flex-col items-center gap-4 text-center px-4 py-6 rounded-2xl bg-secondary-50">
              <b>Як швидко я отримаю вакансії?</b>
              <img src="./icons/time.svg" alt="" />
              <p>Залежить від вашого досвіду, але наш AI швидко підбере найкращі варіанти.</p>
            </li>
            <li className="flex flex-col items-center gap-4 text-center px-4 py-6 rounded-2xl bg-secondary-50">
              <b>Чи можна залишитися анонімним?</b>
              <img src="./icons/incognito.svg" alt="" />
              <p>Ваші дані захищені. Ви можете вибрати, коли і кому показувати ваші контакти</p>
            </li>
          </ul>
        </div>
      </section>
      <LinkedInShowPopup />
      {session && <DialogMsg showOnMount backdrop />}
    </main>
  );
}
