import ExploreSection from "@/components/home/ExploreSection";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dictionary = await getDictionary(locale);

  return (
    <>
      <aside
        aria-label={dictionary.home.preferencesLabel}
        className="absolute right-6 top-4 z-40 flex items-center gap-2 sm:right-10 lg:fixed lg:left-6 lg:right-auto lg:top-1/2 lg:-translate-y-1/2 lg:flex-col lg:gap-3"
      >
        <ThemeSwitcher labels={dictionary.themeSwitcher} />
        <LanguageSwitcher locale={locale} labels={dictionary.languageSwitcher} menuSide="responsive" />
      </aside>
      <main id="main-content" tabIndex={-1} className="flex min-w-0 flex-1 flex-col items-center gap-10 px-6 pb-10 pt-24 sm:gap-12 sm:px-10 sm:pt-28 lg:px-20 lg:py-20">
        <h1 className="sr-only">Iaso Arc</h1>
        <Logo alt={dictionary.home.logoAlt} className="h-auto w-full max-w-[600px] shrink-0 dark:invert" />
        <ExploreSection locale={locale} labels={dictionary.explore} opensInNewTab={dictionary.accessibility.opensInNewTab} />
      </main>
    </>
  );
}
