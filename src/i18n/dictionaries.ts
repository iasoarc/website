import "server-only";

import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then(module => module.default),
  "zh-CN": () => import("./dictionaries/zh-CN.json").then(module => module.default),
};

export function resolveLocale(value: string): Locale {
  if (!isLocale(value)) notFound();
  return value;
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
