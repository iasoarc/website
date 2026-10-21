import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export default function Sitebar({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
    return (
        <header className="px-6 py-4 sm:px-10 lg:px-12 lg:py-6">
            <div role="group" aria-label={dictionary.home.preferencesLabel} className="flex items-center justify-end gap-2">
                <ThemeSwitcher labels={dictionary.themeSwitcher} />
                <LanguageSwitcher locale={locale} labels={dictionary.languageSwitcher} />
            </div>
        </header>
    )
}
