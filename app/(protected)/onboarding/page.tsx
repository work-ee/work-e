import { SvgProgressCircle } from "@/components/SvgProgressCircle";
import { CVUploadTrigger } from "@/components/feedback/CVUploadPopup/CVUploadTrigger";
import { LinkedinSvg } from "@/components/icons";
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
                <LinkedinSvg />
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
