import { SvgProgressCircle } from "@/components/SvgProgressCircle";
import { CVUploadTrigger } from "@/components/feedback/CVUploadPopup/CVUploadTrigger";
import { Button } from "@/components/ui";

export default async function OnboardingPage() {
  return (
    <main className="center-page">
      <section className="section">
        <div className="container text-center">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <SvgProgressCircle percent={0} />
            </div>

            <h1 className="heading-h1 mb-4">Серед 10 000+ вакансій уже є й твоя. Але ми не знаємо, яка саме</h1>

            <div className="max-w-[990px] mx-auto mb-12">
              <p className="text-xl font-black mb-4">
                Щодня на платформі з’являються сотні нових можливостей — і ми хочемо показати ті, що ідеально підходять
                саме тобі.
              </p>
            </div>

            <h2 className="heading-h3">Щоб допомогти:</h2>

            <div className="flex gap-12 justify-center mt-8">
              <Button variant="secondary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path
                    fill="#0A66C2"
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
                Підв'яжи свій Linkedin
              </Button>
              {/* <Button>Завантаж своє CV</Button> */}
              <CVUploadTrigger />
            </div>

            <div className="mt-12">
              <p>Це займе декілька хвилин — і ми зможемо підказати, де тебе чекають.</p>
              <p className="heading-h3">Твоя вакансія вже тут. Допоможи нам її знайти для тебе.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
