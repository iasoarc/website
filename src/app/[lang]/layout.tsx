import type { Metadata } from "next";
import { preinit } from "react-dom";
import "../globals.css";
import Footer from "@/components/Footer";
import ThemeController from "@/components/ThemeController";
import { locales } from "@/i18n/config";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(resolveLocale(lang));

  return {
    title: { default: dictionary.metadata.title, template: "%s | Iaso Arc" },
    description: dictionary.metadata.description,
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dictionary = await getDictionary(locale);

  // React reuses this script resource when the language changes.
  preinit("/theme-init.js", { as: "script", fetchPriority: "high" });

  return (
    <html
      lang={locale}
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        <a href="#main-content" className="skip-link">
          {dictionary.accessibility.skipToContent}
        </a>
        <ThemeController locale={locale} />
        {children}

        <Footer />
      </body>
    </html>
  );
}
