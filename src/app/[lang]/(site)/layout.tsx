import Sitebar from "@/components/Sitebar";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";

export default async function SiteLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dictionary = await getDictionary(locale);

  return (
    <>
      <Sitebar locale={locale} dictionary={dictionary} />
      <main id="main-content" tabIndex={-1} className="min-w-0 flex-1 px-6 py-8 sm:px-10 lg:px-16">{children}</main>
    </>
  );
}
