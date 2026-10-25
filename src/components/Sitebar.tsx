import Link from "next/link";
import Icon from "./Icon";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { localizePathname, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export default function Sitebar({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
    return (
        <header className="flex items-center justify-between px-6 py-4 sm:px-10 lg:px-12 lg:py-6">
            <Link
                href={localizePathname("/", locale)}
                aria-label={dictionary.home.logoAlt}
                title={dictionary.home.logoAlt}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm opacity-80 transition-opacity hover:opacity-100"
            >
                <Icon alt={dictionary.home.logoAlt} className="h-8 w-8 dark:invert" />
            </Link>
            <div role="group" aria-label={dictionary.home.preferencesLabel} className="flex items-center gap-2">
                <ThemeSwitcher labels={dictionary.themeSwitcher} />
                <LanguageSwitcher locale={locale} labels={dictionary.languageSwitcher} />
            </div>
        </header>
    );
}
