import { useTranslations } from "next-intl";

export const Footer = () => {
  const t = useTranslations();
  return (
    <footer className="bg-primary-100 flex min-h-23.5 items-center justify-center py-4">
      <div className="container">
        <div className="label-text text-primary-900 flex gap-26 text-base">
          <p className="text-start">
            © {new Date().getFullYear()}{" "}
            <a href="/">
              work-<i>e</i>.
            </a>{" "}
            {t("footer.copyright")}
          </p>
          <ul className="flex gap-8">
            <li>
              <a href="#">{t("footer.terms")}</a>
            </li>
            <li>
              <a href="#">{t("footer.support")}</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
