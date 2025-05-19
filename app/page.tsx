export default function Home() {
  return (
    <main className="py-8">
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
              <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M23.793 25H1.20703L12.5 13.707L23.793 25ZM11.793 13L0.5 24.293V1.70703L11.793 13ZM24.5 24.293L13.207 13L24.5 1.70703V24.293ZM23.793 1L12.5 12.293L1.20703 1H23.793Z"
                  fill="white"
                  stroke="#212121"
                />
              </svg>
              <p>За допомогою AI створіть ідеальне резюме та супроводжуючий лист, підберіть вакансії для тебе.</p>
            </li>
            <li className="flex max-w-[20rem] flex-col items-center gap-4 text-center">
              <b>Як швидко я отримаю вакансії?</b>
              <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M23.793 25H1.20703L12.5 13.707L23.793 25ZM11.793 13L0.5 24.293V1.70703L11.793 13ZM24.5 24.293L13.207 13L24.5 1.70703V24.293ZM23.793 1L12.5 12.293L1.20703 1H23.793Z"
                  fill="white"
                  stroke="#212121"
                />
              </svg>
              <p>Залежить від вашого досвіду, але наш AI швидко підбере найкращі варіанти.</p>
            </li>
            <li className="flex max-w-[20rem] flex-col items-center gap-4 text-center">
              <b>Чи можна залишитися анонімним?</b>
              <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M23.793 25H1.20703L12.5 13.707L23.793 25ZM11.793 13L0.5 24.293V1.70703L11.793 13ZM24.5 24.293L13.207 13L24.5 1.70703V24.293ZM23.793 1L12.5 12.293L1.20703 1H23.793Z"
                  fill="white"
                  stroke="#212121"
                />
              </svg>
              <p>Ваші дані захищені. Ви можете вибрати, коли і кому показувати ваші контакти</p>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
