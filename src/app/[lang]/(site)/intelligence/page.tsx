import type { Metadata } from "next";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/intelligence">): Promise<Metadata> {
    const { lang } = await params;
    const dictionary = await getDictionary(resolveLocale(lang));
    return { title: dictionary.explore.topics.intelligence.label };
}

export default async function IntelligencePage({ params }: PageProps<"/[lang]/intelligence">) {
    const { lang } = await params;
    const dictionary = await getDictionary(resolveLocale(lang));

    return (
        <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{dictionary.explore.topics.intelligence.label}</h1>
        </div>
    );
}
