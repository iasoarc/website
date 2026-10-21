export const locales = ["en", "zh-CN"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "zh-CN";
export const topicKeys = ["research", "systems", "intelligence", "discovery"] as const;
export type TopicKey = (typeof topicKeys)[number];

export function isLocale(value: string): value is Locale {
  return locales.some(locale => locale === value);
}

// Replace the language segment while keeping the rest of the page path.
export function localizePathname(pathname: string, locale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] && isLocale(segments[0])) segments.shift();

  return `/${[locale, ...segments].join("/")}`;
}
