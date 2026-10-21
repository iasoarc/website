import type { Metadata } from "next";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/discovery">): Promise<Metadata> {
    const { lang } = await params;
    const dictionary = await getDictionary(resolveLocale(lang));
    return { title: dictionary.explore.topics.discovery.label };
}

export default async function DiscoveryPage({ params }: PageProps<"/[lang]/discovery">) {
    const { lang } = await params;
    const dictionary = await getDictionary(resolveLocale(lang));

    return (
        <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{dictionary.explore.topics.discovery.label}</h1>
        </div>
    );
}
